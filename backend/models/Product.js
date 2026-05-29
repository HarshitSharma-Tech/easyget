const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, index: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['Smartphones', 'Laptops', 'Gaming Consoles', 'Graphics Cards', 'Cameras', 'Tablets', 'Accessories'] 
  },
  brand: { type: String, required: true },
  modelName: { type: String, required: true },
  
  // Pricing and AI Estimates
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  aiEstimatedPriceMin: { type: Number },
  aiEstimatedPriceMax: { type: Number },
  
  // Condition & Quality Checks
  condition: { 
    type: String, 
    enum: ['Like New', 'Excellent', 'Good', 'Fair'], 
    required: true 
  },
  conditionDetails: {
    screenScratch: { type: String, enum: ['None', 'Micro', 'Heavy'], default: 'None' },
    bodyCondition: { type: String, enum: ['Flawless', 'Minor Scuffs', 'Dents'], default: 'Flawless' },
    batteryHealth: { type: Number }, // battery health percentage
    functionalityCheck: { type: Boolean, default: true }
  },
  
  // Cloudinary Image URLs
  images: [{ type: String, required: true }],
  
  // Warranty
  warrantyDuration: { type: String, default: '6 Months Seller Warranty' },
  warrantyBadge: { type: Boolean, default: true },
  
  // WhatsApp settings (defaults to seller configurations)
  whatsappNumber: { type: String },
  isWhatsAppBusiness: { type: Boolean, default: false },
  preferredContactMethod: { type: String, default: 'WhatsApp' },
  
  // Verification steps
  status: { 
    type: String, 
    enum: ['Pending Approval', 'Active', 'Sold', 'Inactive', 'Flagged'], 
    default: 'Pending Approval' 
  },
  isVerifiedListing: { type: Boolean, default: false },
  qualityCheckedByAdmin: { type: Boolean, default: false },
  
  viewsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
