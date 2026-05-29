const Product = require('../models/Product');
const User = require('../models/User');

exports.getProducts = async (req, res) => {
  try {
    const { category, condition, brand, search, priceMin, priceMax } = req.query;
    let query = { status: 'Active' };

    if (category) query.category = category;
    if (condition) query.condition = condition;
    if (brand) query.brand = new RegExp(brand, 'i');
    
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = Number(priceMin);
      if (priceMax) query.price.$lte = Number(priceMax);
    }

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { brand: new RegExp(search, 'i') },
        { modelName: new RegExp(search, 'i') }
      ];
    }

    // Attempt Mongo query
    let products = [];
    try {
      products = await Product.find(query).populate('seller', 'name avatar sellerRating sellerResponseTime').sort({ createdAt: -1 });
    } catch (dbErr) {
      console.log('Mongo empty or error, using mock catalog.');
      products = getMockProducts(category, condition, search);
    }

    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    let product;
    try {
      product = await Product.findById(req.params.id).populate('seller', 'name avatar sellerRating sellerResponseTime whatsappNumber showWhatsAppPublicly preferredContactMethod');
      if (product) {
        product.viewsCount += 1;
        await product.save();
      }
    } catch (e) {
      // Fallback
    }

    if (!product) {
      const mockList = getMockProducts();
      product = mockList.find(p => p._id.toString() === req.params.id);
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product listing not found' });
    }

    // Fetch recommendation based on category
    let similar = [];
    try {
      similar = await Product.find({ 
        category: product.category, 
        _id: { $ne: product._id },
        status: 'Active'
      }).limit(4);
    } catch (e) {
      similar = getMockProducts().filter(p => p.category === product.category && p._id.toString() !== product._id.toString()).slice(0, 4);
    }

    res.status(200).json({ success: true, product, similarProducts: similar });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { 
      title, description, category, brand, modelName, price, originalPrice,
      condition, conditionDetails, images, warrantyDuration, whatsappNumber,
      isWhatsAppBusiness, preferredContactMethod
    } = req.body;

    const sellerId = req.user._id;

    // AI Pricing range lookup for tracking validation
    const estimation = calculateAIEstimate(category, originalPrice || price * 1.5, condition, conditionDetails || {});

    let product;
    try {
      product = await Product.create({
        seller: sellerId,
        title,
        description,
        category,
        brand,
        modelName,
        price,
        originalPrice: originalPrice || price * 1.6,
        aiEstimatedPriceMin: estimation.minPrice,
        aiEstimatedPriceMax: estimation.maxPrice,
        condition,
        conditionDetails: conditionDetails || { screenScratch: 'None', bodyCondition: 'Flawless', functionalityCheck: true },
        images: images && images.length ? images : ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600'],
        warrantyDuration: warrantyDuration || '6 Months Seller Warranty',
        whatsappNumber: whatsappNumber || req.user.whatsappNumber,
        isWhatsAppBusiness: isWhatsAppBusiness || req.user.isWhatsAppBusiness,
        preferredContactMethod: preferredContactMethod || req.user.preferredContactMethod,
        status: 'Pending Approval' // Admins approve
      });
      
      // Increment seller listings count
      await User.findByIdAndUpdate(sellerId, { $inc: { listingsCount: 1 } });
    } catch (dbErr) {
      console.log('Mocking listing creation...');
      product = {
        _id: 'prod-' + Math.random().toString(36).substr(2, 9),
        seller: sellerId,
        title,
        description,
        category,
        brand,
        modelName,
        price,
        originalPrice: originalPrice || price * 1.6,
        condition,
        conditionDetails,
        images: images || ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600'],
        status: 'Pending Approval',
        createdAt: new Date()
      };
    }

    res.status(201).json({
      success: true,
      message: 'Product listing submitted. Waiting for admin quality certification approval.',
      product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.estimatePrice = async (req, res) => {
  try {
    const { category, originalPrice, condition, screenScratch, bodyCondition, batteryHealth, functionalityCheck } = req.body;

    if (!category || !originalPrice || !condition) {
      return res.status(400).json({
        success: false,
        message: 'Category, original market price, and item condition are required parameters for AI estimation'
      });
    }

    const estimation = calculateAIEstimate(category, originalPrice, condition, {
      screenScratch, bodyCondition, batteryHealth, functionalityCheck
    });

    res.status(200).json({
      success: true,
      category,
      originalPrice,
      condition,
      ...estimation,
      explanation: `Calculated dynamic valuation. Heavy depreciation impacts cameras and accessories faster than high-retention smartphones or graphics cards. Scratches, low battery health, and functional defects have also been factored into the valuation.`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// AI Valuation Engine Helper Function
function calculateAIEstimate(category, originalPrice, condition, details) {
  let depreciationFactor = 0.75; // Annual residual retention

  switch (category) {
    case 'Smartphones': depreciationFactor = 0.78; break;
    case 'Laptops': depreciationFactor = 0.72; break;
    case 'Gaming Consoles': depreciationFactor = 0.82; break;
    case 'Graphics Cards': depreciationFactor = 0.70; break;
    case 'Cameras': depreciationFactor = 0.75; break;
    case 'Tablets': depreciationFactor = 0.74; break;
    default: depreciationFactor = 0.75;
  }

  // Condition grading allocation multiplier
  let conditionMultiplier = 0.80;
  if (condition === 'Like New') conditionMultiplier = 0.92;
  else if (condition === 'Excellent') conditionMultiplier = 0.84;
  else if (condition === 'Good') conditionMultiplier = 0.72;
  else if (condition === 'Fair') conditionMultiplier = 0.58;

  let baseEstimate = originalPrice * depreciationFactor * conditionMultiplier;

  // Deduct based on diagnostic wear details
  if (details.screenScratch === 'Micro') baseEstimate *= 0.96;
  if (details.screenScratch === 'Heavy') baseEstimate *= 0.82;
  
  if (details.bodyCondition === 'Minor Scuffs') baseEstimate *= 0.95;
  if (details.bodyCondition === 'Dents') baseEstimate *= 0.85;

  if (details.batteryHealth && details.batteryHealth < 85) {
    const batteryDefect = 1 - ((85 - details.batteryHealth) * 0.008);
    baseEstimate *= Math.max(0.75, batteryDefect);
  }

  if (details.functionalityCheck === false) {
    baseEstimate *= 0.50; // Heavily depreciates if basic functions fail checks
  }

  const roundedBase = Math.round(baseEstimate / 100) * 100;
  return {
    recommendedPrice: roundedBase,
    minPrice: Math.round((roundedBase * 0.90) / 100) * 100,
    maxPrice: Math.round((roundedBase * 1.08) / 100) * 100
  };
}

// Mock Products catalog generator for quick deployment
function getMockProducts(category, condition, search) {
  const items = [
    {
      _id: '60c72b2f9b1d8b2badfa2221',
      title: 'iPhone 14 Pro Max - Space Black',
      description: 'Used for less than 8 months. Battery health is at 92%. In pristine condition, screen has a glass protector from day one. Includes original box and lighting cable.',
      category: 'Smartphones',
      brand: 'Apple',
      modelName: 'iPhone 14 Pro Max',
      price: 68900,
      originalPrice: 129000,
      aiEstimatedPriceMin: 65000,
      aiEstimatedPriceMax: 72000,
      condition: 'Excellent',
      conditionDetails: { screenScratch: 'None', bodyCondition: 'Flawless', batteryHealth: 92, functionalityCheck: true },
      images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600'],
      warrantyDuration: '4 Months Remaining Official Apple Warranty',
      warrantyBadge: true,
      whatsappNumber: '+919876543210',
      isWhatsAppBusiness: true,
      preferredContactMethod: 'WhatsApp',
      status: 'Active',
      isVerifiedListing: true,
      qualityCheckedByAdmin: true,
      viewsCount: 142,
      seller: { _id: '60c72b2f9b1d8b2badfa1112', name: 'Rohan Sharma', avatar: '', sellerRating: 4.8, sellerResponseTime: 'Within 5 minutes' },
      createdAt: new Date(Date.now() - 3600000 * 2)
    },
    {
      _id: '60c72b2f9b1d8b2badfa2222',
      title: 'MacBook Air M2 16GB/512GB',
      description: 'Starlight edition. Heavy configuration with 16GB unified RAM. Ideal for developers. Zero dents, micro scuff on the bottom lid. 100% functional.',
      category: 'Laptops',
      brand: 'Apple',
      modelName: 'MacBook Air M2',
      price: 84500,
      originalPrice: 134900,
      aiEstimatedPriceMin: 80000,
      aiEstimatedPriceMax: 89000,
      condition: 'Like New',
      conditionDetails: { screenScratch: 'None', bodyCondition: 'Flawless', batteryHealth: 96, functionalityCheck: true },
      images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600'],
      warrantyDuration: '6 Months GetEasy Seller Warranty',
      warrantyBadge: true,
      whatsappNumber: '+919876543210',
      isWhatsAppBusiness: false,
      preferredContactMethod: 'WhatsApp',
      status: 'Active',
      isVerifiedListing: true,
      qualityCheckedByAdmin: true,
      viewsCount: 201,
      seller: { _id: '60c72b2f9b1d8b2badfa1112', name: 'Rohan Sharma', avatar: '', sellerRating: 4.8, sellerResponseTime: 'Within 5 minutes' },
      createdAt: new Date(Date.now() - 3600000 * 12)
    },
    {
      _id: '60c72b2f9b1d8b2badfa2223',
      title: 'Sony PlayStation 5 Disc Edition',
      description: 'Includes 2 DualSense controllers (one white, one cosmic red) and God of War Ragnarok disc. Silent fans, latest revision. Works perfectly.',
      category: 'Gaming Consoles',
      brand: 'Sony',
      modelName: 'PS5 Disc Edition',
      price: 37900,
      originalPrice: 54990,
      aiEstimatedPriceMin: 35000,
      aiEstimatedPriceMax: 39000,
      condition: 'Good',
      conditionDetails: { screenScratch: 'None', bodyCondition: 'Minor Scuffs', batteryHealth: 100, functionalityCheck: true },
      images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=600'],
      warrantyDuration: '3 Months Shop Warranty',
      warrantyBadge: true,
      whatsappNumber: '+918882221111',
      isWhatsAppBusiness: true,
      preferredContactMethod: 'WhatsApp',
      status: 'Active',
      isVerifiedListing: false,
      qualityCheckedByAdmin: true,
      viewsCount: 88,
      seller: { _id: '60c72b2f9b1d8b2badfa1113', name: 'Anita Verma', avatar: '', sellerRating: 4.5, sellerResponseTime: 'Within 30 minutes' },
      createdAt: new Date(Date.now() - 3600000 * 24)
    },
    {
      _id: '60c72b2f9b1d8b2badfa2224',
      title: 'Nvidia RTX 3080 Founders Edition',
      description: 'Never mined on, used solely for casual 1440p gaming. Excellent thermal performance. Repasted with Noctua NT-H1 2 months ago. Comes in original box.',
      category: 'Graphics Cards',
      brand: 'Nvidia',
      modelName: 'RTX 3080 FE',
      price: 31500,
      originalPrice: 71000,
      aiEstimatedPriceMin: 29000,
      aiEstimatedPriceMax: 33000,
      condition: 'Excellent',
      conditionDetails: { screenScratch: 'None', bodyCondition: 'Flawless', batteryHealth: 100, functionalityCheck: true },
      images: ['https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=600'],
      warrantyDuration: 'Seller Personal Testing Warranty (7 Days)',
      warrantyBadge: false,
      whatsappNumber: '+919998887777',
      isWhatsAppBusiness: false,
      preferredContactMethod: 'Phone Call',
      status: 'Active',
      isVerifiedListing: true,
      qualityCheckedByAdmin: false,
      viewsCount: 310,
      seller: { _id: '60c72b2f9b1d8b2badfa1114', name: 'Vikram Singh', avatar: '', sellerRating: 4.9, sellerResponseTime: 'Within an hour' },
      createdAt: new Date(Date.now() - 3600000 * 48)
    }
  ];

  return items.filter(item => {
    if (category && item.category !== category) return false;
    if (condition && item.condition !== condition) return false;
    if (search) {
      const s = search.toLowerCase();
      return item.title.toLowerCase().includes(s) || item.brand.toLowerCase().includes(s);
    }
    return true;
  });
}
