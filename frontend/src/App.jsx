import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { 
  Search, Smartphone, Laptop, Gamepad, Cpu, Camera, Tablet, Sliders, 
  MessageSquare, ShoppingCart, Heart, User, Plus, TrendingUp, CheckCircle, 
  AlertCircle, Trash2, LogOut, ShieldCheck, HelpCircle, Send, Star, 
  Award, Phone, ArrowLeft, ExternalLink, Moon, Sun, DollarSign, 
  MapPin, Check, X, ShieldAlert, Clock, ChevronRight, BarChart2
} from 'lucide-react';

// Seeding Initial Catalog Data
const INITIAL_PRODUCTS = [
  {
    id: 'prod-iphone14',
    title: 'iPhone 14 Pro Max - Space Black',
    description: 'Used for less than 8 months. Battery health is at 92%. In pristine condition, screen has a glass protector from day one. Includes original box and lightning cable.',
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
    whatsappNumber: '+917500328988',
    isWhatsAppBusiness: true,
    preferredContactMethod: 'WhatsApp',
    status: 'Active',
    isVerifiedListing: true,
    qualityCheckedByAdmin: true,
    viewsCount: 142,
    seller: { id: 'sel-rohan', name: 'Rohan Sharma', avatar: '', sellerRating: 4.8, sellerResponseTime: 'Within 5 minutes' },
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'prod-macbookm2',
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
    whatsappNumber: '+917500328988',
    isWhatsAppBusiness: false,
    preferredContactMethod: 'WhatsApp',
    status: 'Active',
    isVerifiedListing: true,
    qualityCheckedByAdmin: true,
    viewsCount: 201,
    seller: { id: 'sel-rohan', name: 'Rohan Sharma', avatar: '', sellerRating: 4.8, sellerResponseTime: 'Within 5 minutes' },
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    id: 'prod-ps5',
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
    seller: { id: 'sel-anita', name: 'Anita Verma', avatar: '', sellerRating: 4.5, sellerResponseTime: 'Within 30 minutes' },
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 'prod-rtx3080',
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
    seller: { id: 'sel-vikram', name: 'Vikram Singh', avatar: '', sellerRating: 4.9, sellerResponseTime: 'Within an hour' },
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    id: 'prod-eosr6',
    title: 'Canon EOS R6 Mark II Mirrorless Camera',
    description: 'Body only. In flawless like new condition. Shutter count is only 3,200. Always kept in dry cabinet. Charger, original strap and battery included.',
    category: 'Cameras',
    brand: 'Canon',
    modelName: 'EOS R6 Mk II',
    price: 162000,
    originalPrice: 243900,
    aiEstimatedPriceMin: 155000,
    aiEstimatedPriceMax: 170000,
    condition: 'Like New',
    conditionDetails: { screenScratch: 'None', bodyCondition: 'Flawless', batteryHealth: 98, functionalityCheck: true },
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600'],
    warrantyDuration: '1 Year Brand Warranty',
    warrantyBadge: true,
    whatsappNumber: '+917500328988',
    isWhatsAppBusiness: true,
    preferredContactMethod: 'WhatsApp',
    status: 'Active',
    isVerifiedListing: true,
    qualityCheckedByAdmin: true,
    viewsCount: 74,
    seller: { id: 'sel-rohan', name: 'Rohan Sharma', avatar: '', sellerRating: 4.8, sellerResponseTime: 'Within 5 minutes' },
    createdAt: new Date(Date.now() - 3600000 * 60).toISOString()
  },
  {
    id: 'prod-pending-ipad',
    title: 'iPad Pro 11-inch M1 128GB WiFi',
    description: 'Excellent condition. Box charger included. Space Grey color. Selling to upgrade to newer M4 iPad.',
    category: 'Tablets',
    brand: 'Apple',
    modelName: 'iPad Pro 11 M1',
    price: 43500,
    originalPrice: 71900,
    aiEstimatedPriceMin: 41000,
    aiEstimatedPriceMax: 45000,
    condition: 'Excellent',
    conditionDetails: { screenScratch: 'None', bodyCondition: 'Minor Scuffs', batteryHealth: 88, functionalityCheck: true },
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600'],
    warrantyDuration: '6 Months Seller Warranty',
    warrantyBadge: true,
    whatsappNumber: '+919988776655',
    isWhatsAppBusiness: false,
    preferredContactMethod: 'WhatsApp',
    status: 'Pending Approval', // Awaiting Admin Certification
    isVerifiedListing: false,
    qualityCheckedByAdmin: false,
    viewsCount: 4,
    seller: { id: 'sel-vikram', name: 'Vikram Singh', avatar: '', sellerRating: 4.9, sellerResponseTime: 'Within an hour' },
    createdAt: new Date().toISOString()
  }
];

const CATEGORIES = [
  { name: 'Smartphones', icon: Smartphone, count: 28 },
  { name: 'Laptops', icon: Laptop, count: 19 },
  { name: 'Gaming Consoles', icon: Gamepad, count: 12 },
  { name: 'Graphics Cards', icon: Cpu, count: 8 },
  { name: 'Cameras', icon: Camera, count: 14 },
  { name: 'Tablets', icon: Tablet, count: 16 },
  { name: 'Accessories', icon: Sliders, count: 35 }
];

const PRESET_IMAGES = {
  'Smartphones': [
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=600'
  ],
  'Laptops': [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600',
    'https://images.unsplash.com/photo-1496181130204-7552cc145cdb?q=80&w=600',
    'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600'
  ],
  'Gaming Consoles': [
    'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=600',
    'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600'
  ],
  'Graphics Cards': [
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=600',
    'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600'
  ],
  'Cameras': [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600',
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=600'
  ],
  'Tablets': [
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600',
    'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?q=80&w=600'
  ],
  'Accessories': [
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600',
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=600'
  ]
};

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('geteasy_view') || 'home';
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('geteasy_isLoggedIn') === 'true';
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [authForm, setAuthForm] = useState({
    name: 'Harshit Sharma',
    email: 'harshit@gmail.com',
    whatsappNumber: '+91 75003 28988',
    role: 'buyer',
    password: 'password123'
  });

  const [isAwaitingOtp, setIsAwaitingOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [emailForOtp, setEmailForOtp] = useState('');

  const [currentUser, setCurrentUser] = useState(() => {
    const defaultUser = {
      id: 'usr-buyer1',
      name: 'Harshit Sharma',
      email: 'harshit@gmail.com',
      role: 'buyer', // buyer, seller, admin
      whatsappNumber: '+917500328988',
      isWhatsAppVerified: true,
      preferredContactMethod: 'WhatsApp',
      earnings: 45200,
      wishlist: ['prod-iphone14'],
      cart: []
    };
    
    const saved = localStorage.getItem('geteasy_user');
    if (saved && saved !== 'null' && saved !== 'undefined') {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...defaultUser, ...parsed };
        }
      } catch (e) {
        // ignore
      }
    }
    return defaultUser;
  });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('geteasy_view', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('geteasy_isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('geteasy_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // Handle active login/register fetch to Express API
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    try {
      // Local validation for unique admin credentials to ensure correctness even before API request if desired,
      // but let the backend API handle it first.
      const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';
      const bodyPayload = isRegistering 
        ? { 
            name: authForm.name, 
            email: authForm.email, 
            password: authForm.password, 
            whatsappNumber: authForm.whatsappNumber, 
            role: authForm.role 
          }
        : { 
            email: authForm.email, 
            password: authForm.password 
          };
      
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });
      
      const data = await response.json();
      
      if (data.requiresOtp) {
        setIsAwaitingOtp(true);
        setEmailForOtp(data.email || authForm.email);
        triggerToast('Please check your email for the OTP.', 'info');
        return;
      }
      
      if (data.success) {
        localStorage.setItem('geteasy_token', data.token || 'mock-token');
        const userObj = data.user 
          ? { cart: [], wishlist: [], ...data.user }
          : {
              id: 'usr-harshit',
              name: authForm.name || 'Harshit Sharma',
              email: authForm.email,
              role: authForm.role || 'buyer',
              whatsappNumber: authForm.whatsappNumber || '+917500328988',
              isWhatsAppVerified: true,
              preferredContactMethod: 'WhatsApp',
              earnings: 45200,
              wishlist: ['prod-iphone14'],
              cart: []
            };
        // Standardize _id to id if returned from backend
        if (userObj._id && !userObj.id) {
          userObj.id = userObj._id;
        }
        setCurrentUser(userObj);
        setIsLoggedIn(true);
        triggerToast(`Welcome back, ${userObj.name}!`, 'success');
        if (userObj.role === 'seller') setCurrentView('seller-dashboard');
        else if (userObj.role === 'admin') setCurrentView('admin-dashboard');
        else setCurrentView('home');
      } else {
        triggerToast(data.message || 'Authentication details failed.', 'warning');
      }
    } catch (err) {
      console.warn("Backend auth fetch failed, falling back to mock authentication:", err);
      
      // Fallback check for the unique admin credentials
      if (authForm.email === '111sharmaharshit@gmail.com') {
        if (authForm.password !== 'harshit@8901') {
          triggerToast('Authentication details failed. Invalid credentials.', 'warning');
          return;
        }
        const adminObj = {
          id: 'naval123',
          name: 'naval123',
          email: '111sharmaharshit@gmail.com',
          role: 'admin',
          whatsappNumber: authForm.whatsappNumber || '+917500328988',
          isWhatsAppVerified: true,
          preferredContactMethod: 'WhatsApp',
          earnings: 45200,
          wishlist: ['prod-iphone14'],
          cart: []
        };
        setCurrentUser(adminObj);
        setIsLoggedIn(true);
        triggerToast('Welcome back, Admin naval123!', 'success');
        setCurrentView('admin-dashboard');
        return;
      }

      // Fallback for regular mock users
      const userObj = {
        id: 'usr-harshit',
        name: isRegistering ? authForm.name : 'Harshit Sharma',
        email: authForm.email,
        role: authForm.role,
        whatsappNumber: authForm.whatsappNumber || '+917500328988',
        isWhatsAppVerified: true,
        preferredContactMethod: 'WhatsApp',
        earnings: 45200,
        wishlist: ['prod-iphone14'],
        cart: []
      };
      setCurrentUser(userObj);
      setIsLoggedIn(true);
      triggerToast('Signed in successfully (Offline Sandbox Mode)!', 'success');
      if (authForm.role === 'seller') setCurrentView('seller-dashboard');
      else if (authForm.role === 'admin') setCurrentView('admin-dashboard');
      else setCurrentView('home');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailForOtp, otp })
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('geteasy_token', data.token);
        const userObj = data.user ? { cart: [], wishlist: [], ...data.user } : {};
        if (userObj._id && !userObj.id) userObj.id = userObj._id;
        setCurrentUser(userObj);
        setIsLoggedIn(true);
        setIsAwaitingOtp(false);
        triggerToast('Email verified successfully!', 'success');
        if (userObj.role === 'seller') setCurrentView('seller-dashboard');
        else setCurrentView('home');
      } else {
        triggerToast(data.message || 'Invalid OTP', 'warning');
      }
    } catch (err) {
      triggerToast('Verification failed. Try again.', 'error');
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential })
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('geteasy_token', data.token);
        const userObj = data.user ? { cart: [], wishlist: [], ...data.user } : {};
        if (userObj._id && !userObj.id) userObj.id = userObj._id;
        setCurrentUser(userObj);
        setIsLoggedIn(true);
        triggerToast('Google Sign-In successful!', 'success');
        setCurrentView('home');
      } else {
        triggerToast('Google authentication failed.', 'warning');
      }
    } catch (err) {
      triggerToast('Google Sign-In error.', 'error');
    }
  };

  const handleGoogleError = () => {
    triggerToast('Google Login Failed', 'error');
  };

  // Theme & Catalog lists
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('geteasy_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed)) return parsed;
      } catch (e) {
        // ignore
      }
    }
    return INITIAL_PRODUCTS;
  });
  
  useEffect(() => {
    localStorage.setItem('geteasy_products', JSON.stringify(products));
  }, [products]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Search and filter options
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  
  // AI Pricing Tool Inputs state
  const [estimatorInputs, setEstimatorInputs] = useState({
    category: 'Smartphones',
    originalPrice: 80000,
    condition: 'Excellent',
    screenScratch: 'None',
    bodyCondition: 'Flawless',
    batteryHealth: 90,
    functionalityCheck: true
  });
  const [estimatorResult, setEstimatorResult] = useState(null);
  const [estimatingInProgress, setEstimatingInProgress] = useState(false);

  // Messaging Thread State
  const [activeChatThread, setActiveChatThread] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'sel-rohan', text: "Hello! Yes, the iPhone is available. Standard shipping takes 2 days.", timestamp: '09:30 AM' }
  ]);
  const [newMsgText, setNewMsgText] = useState('');

  // Seller Dashboard variables
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [newListing, setNewListing] = useState({
    title: '', description: '', category: 'Smartphones', brand: '', modelName: '',
    price: '', originalPrice: '', condition: 'Excellent', screenScratch: 'None',
    bodyCondition: 'Flawless', batteryHealth: 90, functionalityCheck: true,
    warrantyDuration: '6 Months Seller Warranty', whatsappNumber: '+917500328988',
    isWhatsAppBusiness: false, preferredContactMethod: 'WhatsApp',
    images: []
  });

  // Admin Dashboard Alerts & Disputes
  const [disputes, setDisputes] = useState([
    { id: 'disp-101', orderId: 'ord-883', buyer: 'Suresh Kumar', seller: 'Vikram Singh', item: 'Nvidia RTX 3080 FE', reason: 'Coil whine is excessive and thermal paste is leaking.', status: 'Pending Audit' }
  ]);
  const [toast, setToast] = useState(null);

  // Show dynamic toast banner helper
  const triggerToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Sync scroll on navigating pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, selectedProduct]);

  // Wishlist addition toggle
  const toggleWishlist = (prodId, e) => {
    e.stopPropagation();
    setCurrentUser(prev => {
      const isStarred = prev.wishlist.includes(prodId);
      const updated = isStarred 
        ? prev.wishlist.filter(id => id !== prodId)
        : [...prev.wishlist, prodId];
      triggerToast(isStarred ? 'Removed from Wishlist' : 'Added to Wishlist!', 'info');
      return { ...prev, wishlist: updated };
    });
  };

  // Cart addition toggle
  const addToCart = (product, e) => {
    if (e) e.stopPropagation();
    setCurrentUser(prev => {
      if (prev.cart.includes(product.id)) {
        triggerToast('Item is already in your cart!', 'info');
        return prev;
      }
      triggerToast('Added to Cart!');
      return { ...prev, cart: [...prev.cart, product.id] };
    });
  };

  // Remove from Cart
  const removeFromCart = (id) => {
    setCurrentUser(prev => ({
      ...prev,
      cart: prev.cart.filter(c => c !== id)
    }));
    triggerToast('Removed item from cart.');
  };

  // WhatsApp click-to-chat generator link
  const generateWhatsAppLink = (product) => {
    const defaultText = `Hi! I am interested in your GetEasy listing: *${product.title}* priced at ₹${product.price.toLocaleString()}. Is it still available?`;
    const cleanedNumber = product.whatsappNumber.replace(/[^0-9]/g, '');
    const number = cleanedNumber.startsWith('91') ? cleanedNumber : `91${cleanedNumber}`;
    return `https://wa.me/${number}?text=${encodeURIComponent(defaultText)}`;
  };

  // Simulated AI Price Calculation
  const runAIPriceEstimation = () => {
    setEstimatingInProgress(true);
    setTimeout(() => {
      let depFactor = 0.75;
      if (estimatorInputs.category === 'Smartphones') depFactor = 0.78;
      else if (estimatorInputs.category === 'Laptops') depFactor = 0.72;
      else if (estimatorInputs.category === 'Gaming Consoles') depFactor = 0.82;
      else if (estimatorInputs.category === 'Graphics Cards') depFactor = 0.70;

      let condMultiplier = 0.80;
      if (estimatorInputs.condition === 'Like New') condMultiplier = 0.92;
      else if (estimatorInputs.condition === 'Excellent') condMultiplier = 0.84;
      else if (estimatorInputs.condition === 'Good') condMultiplier = 0.72;
      else if (estimatorInputs.condition === 'Fair') condMultiplier = 0.58;

      let estimateVal = estimatorInputs.originalPrice * depFactor * condMultiplier;

      // Diagnostic deducts
      if (estimatorInputs.screenScratch === 'Micro') estimateVal *= 0.96;
      if (estimatorInputs.screenScratch === 'Heavy') estimateVal *= 0.80;
      
      if (estimatorInputs.bodyCondition === 'Minor Scuffs') estimateVal *= 0.95;
      if (estimatorInputs.bodyCondition === 'Dents') estimateVal *= 0.84;

      const batteryH = parseInt(estimatorInputs.batteryHealth) || 90;
      if (batteryH < 85) {
        estimateVal *= (1 - (85 - batteryH) * 0.01);
      }

      if (!estimatorInputs.functionalityCheck) {
        estimateVal *= 0.50;
      }

      const recommended = Math.round(estimateVal / 100) * 100;
      setEstimatorResult({
        recommendedPrice: recommended,
        minRange: Math.round((recommended * 0.92) / 100) * 100,
        maxRange: Math.round((recommended * 1.08) / 100) * 100
      });
      setEstimatingInProgress(false);
      triggerToast('AI dynamic valuation completed!');
    }, 1200);
  };

  // Submitting new listings (Sellers)
  const submitNewListing = (e) => {
    e.preventDefault();
    if (!newListing.title || !newListing.price) {
      triggerToast('Please complete required details', 'warning');
      return;
    }

    const priceNum = parseFloat(newListing.price);
    const origPriceNum = newListing.originalPrice ? parseFloat(newListing.originalPrice) : priceNum * 1.5;

    // AI bounds computed for default display
    const mockMin = Math.round(priceNum * 0.93);
    const mockMax = Math.round(priceNum * 1.07);

    // Get default image based on category if no image is specified
    const defaultCatImage = PRESET_IMAGES[newListing.category]?.[0] || 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600';
    const finalImages = newListing.images && newListing.images.length ? newListing.images : [defaultCatImage];

    if (editingProductId) {
      // Update existing listing
      setProducts(prev => prev.map(p => {
        if (p.id === editingProductId) {
          return {
            ...p,
            title: newListing.title,
            description: newListing.description || 'Pre-owned electronic item in pristine condition.',
            category: newListing.category,
            brand: newListing.brand || p.brand || 'Generic',
            modelName: newListing.modelName || p.modelName || 'Model V1',
            price: priceNum,
            originalPrice: origPriceNum,
            aiEstimatedPriceMin: mockMin,
            aiEstimatedPriceMax: mockMax,
            condition: newListing.condition,
            conditionDetails: { 
              screenScratch: newListing.screenScratch, 
              bodyCondition: newListing.bodyCondition, 
              batteryHealth: parseInt(newListing.batteryHealth) || 90, 
              functionalityCheck: newListing.functionalityCheck 
            },
            images: finalImages,
            status: 'Pending Approval', // Resubmitting triggers status reset to Pending Approval
            isVerifiedListing: false,
            qualityCheckedByAdmin: false
          };
        }
        return p;
      }));
      setEditingProductId(null);
      triggerToast('Listing updated successfully! Submitted for Admin Quality check.', 'success');
    } else {
      // Create new listing
      const addedProduct = {
        id: 'prod-' + Date.now(),
        title: newListing.title,
        description: newListing.description || 'Pre-owned electronic item in pristine condition.',
        category: newListing.category,
        brand: newListing.brand || 'Generic',
        modelName: newListing.modelName || 'Model V1',
        price: priceNum,
        originalPrice: origPriceNum,
        aiEstimatedPriceMin: mockMin,
        aiEstimatedPriceMax: mockMax,
        condition: newListing.condition,
        conditionDetails: { 
          screenScratch: newListing.screenScratch, 
          bodyCondition: newListing.bodyCondition, 
          batteryHealth: parseInt(newListing.batteryHealth) || 90, 
          functionalityCheck: newListing.functionalityCheck 
        },
        images: finalImages,
        warrantyDuration: newListing.warrantyDuration,
        warrantyBadge: true,
        whatsappNumber: newListing.whatsappNumber || '+917500328988',
        isWhatsAppBusiness: newListing.isWhatsAppBusiness,
        preferredContactMethod: newListing.preferredContactMethod,
        status: 'Pending Approval', // Awaiting Admin Check
        isVerifiedListing: false,
        qualityCheckedByAdmin: false,
        viewsCount: 1,
        seller: { id: currentUser.id, name: currentUser.name, avatar: '', sellerRating: 5.0, sellerResponseTime: 'Replies in 10 mins' },
        createdAt: new Date().toISOString()
      };

      setProducts(prev => [addedProduct, ...prev]);
      triggerToast('Listing submitted! Waiting for Admin Quality verification.', 'success');
    }
    
    // Clear form
    setNewListing({
      title: '', description: '', category: 'Smartphones', brand: '', modelName: '',
      price: '', originalPrice: '', condition: 'Excellent', screenScratch: 'None',
      bodyCondition: 'Flawless', batteryHealth: 90, functionalityCheck: true,
      warrantyDuration: '6 Months Seller Warranty', whatsappNumber: '+917500328988',
      isWhatsAppBusiness: false, preferredContactMethod: 'WhatsApp',
      images: []
    });
  };

  // Administrator approval of pending listings
  const approveListingByAdmin = (prodId) => {
    setProducts(prev => prev.map(p => {
      if (p.id === prodId) {
        return { ...p, status: 'Active', isVerifiedListing: true, qualityCheckedByAdmin: true };
      }
      return p;
    }));
    triggerToast('Product approved! Live in public marketplace catalog.');
  };

  // Administrator rejection
  const rejectListingByAdmin = (prodId) => {
    setProducts(prev => prev.map(p => {
      if (p.id === prodId) {
        return { ...p, status: 'Rejected', isVerifiedListing: false, qualityCheckedByAdmin: false };
      }
      return p;
    }));
    triggerToast('Listing rejected by Admin.', 'warning');
  };

  // Administrator Request Changes
  const requestChangesByAdmin = (prodId) => {
    setProducts(prev => prev.map(p => {
      if (p.id === prodId) {
        return { ...p, status: 'Changes Requested' };
      }
      return p;
    }));
    triggerToast('Changes requested from the seller.', 'info');
  };

  // Messaging controls
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMsgText.trim()) return;

    setChatMessages(prev => [
      ...prev,
      { id: Date.now(), sender: 'buyer', text: newMsgText, timestamp: 'Just now' }
    ]);
    setNewMsgText('');
    
    // Auto-responder simulation
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { id: Date.now() + 1, sender: activeChatThread?.seller?.id || 'sel-rohan', text: "Thanks for writing. Please click 'Chat on WhatsApp' above to complete the payment or details faster!", timestamp: 'Just now' }
      ]);
    }, 1500);
  };

  // Filter products by selected options
  const activeProducts = products.filter(p => {
    if (p.status !== 'Active') return false;
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (selectedCondition !== 'All' && p.condition !== selectedCondition) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(q) || 
             p.brand.toLowerCase().includes(q) || 
             p.description.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Dynamic Toast Alerts */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-2xl transition-all duration-300 animate-slide-up border ${
          toast.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
          toast.type === 'warning' ? 'bg-amber-50 text-amber-800 border-amber-200' :
          'bg-blue-50 text-blue-800 border-blue-200'
        }`}>
          {toast.type === 'success' ? <CheckCircle className="h-5 w-5 text-emerald-500" /> :
           toast.type === 'warning' ? <AlertCircle className="h-5 w-5 text-amber-500" /> :
           <Award className="h-5 w-5 text-blue-500" />}
          <span className="text-sm font-semibold">{toast.msg}</span>
        </div>
      )}

      {!isLoggedIn ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-4 py-12">
          {/* Glassmorphic Auth Card */}
          <div className="w-full max-w-md bg-white/10 dark:bg-slate-900/60 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6 text-white animate-slide-up">
            
            {/* Header info */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center bg-brand-blue text-white p-3 rounded-2xl font-bold text-xl shadow-lg mb-1">
                GE
              </div>
              <h2 className="text-2xl font-black tracking-tight">GetEasy Recommerce</h2>
              <p className="text-xs text-slate-300">
                {isRegistering ? 'Create your buyer, seller, or admin profile' : 'Sign in to buy and sell verified devices'}
              </p>
            </div>

            {isAwaitingOtp ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-300">Enter 6-Digit OTP</label>
                  <p className="text-xs text-slate-400 mb-2">Sent to {emailForOtp}</p>
                  <input 
                    type="text" 
                    required
                    placeholder="123456"
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-blue text-center tracking-widest text-lg text-white"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <button 
                  onClick={handleVerifyOtp}
                  className="w-full py-2.5 bg-gradient-to-r from-brand-blue to-emerald-500 hover:from-blue-600 hover:to-emerald-600 font-bold rounded-xl shadow-lg transition-all text-[10px] tracking-wider uppercase mt-4"
                >
                  Verify Email
                </button>
                <button 
                  onClick={() => setIsAwaitingOtp(false)}
                  className="w-full py-2 text-slate-400 text-xs hover:text-white transition-colors"
                >
                  Back to Login
                </button>
              </div>
            ) : (
              <>
                {/* Auth Toggle tabs */}
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                  <button 
                    type="button"
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${!isRegistering ? 'bg-brand-blue text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                    onClick={() => setIsRegistering(false)}
                  >
                    Sign In
                  </button>
                  <button 
                    type="button"
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${isRegistering ? 'bg-brand-blue text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                    onClick={() => setIsRegistering(true)}
                  >
                    Register
                  </button>
                </div>

                {/* Credentials Form */}
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {isRegistering && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-300">Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Harshit Sharma"
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-blue text-xs text-white"
                        value={authForm.name}
                        onChange={(e) => setAuthForm(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-300">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="harshit@gmail.com"
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-blue text-xs text-white"
                      value={authForm.email}
                      onChange={(e) => setAuthForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-300">WhatsApp Contact Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+91 75003 28988"
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-blue text-xs text-white"
                      value={authForm.whatsappNumber}
                      onChange={(e) => setAuthForm(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-300">Password</label>
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-blue text-xs text-white"
                      value={authForm.password}
                      onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-300">Account Access Role</label>
                    <select 
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-blue text-xs text-slate-200 bg-slate-900"
                      value={authForm.role}
                      onChange={(e) => setAuthForm(prev => ({ ...prev, role: e.target.value }))}
                    >
                      <option value="buyer" className="text-white">Buyer (Browse & Purchase)</option>
                      <option value="seller" className="text-white">Seller (Manage Inventory)</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-brand-blue to-emerald-500 hover:from-blue-600 hover:to-emerald-600 font-bold rounded-xl shadow-lg transition-all text-[10px] tracking-wider uppercase mt-4"
                  >
                    {isRegistering ? 'Create Account & Login' : 'Login to Dashboard'}
                  </button>
                </form>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-white/10"></div>
                  <span className="flex-shrink mx-4 text-slate-400 text-[10px] font-bold">OR</span>
                  <div className="flex-grow border-t border-white/10"></div>
                </div>

                {/* Google Sign In Component */}
                <div className="flex justify-center w-full">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    theme="filled_blue"
                    shape="pill"
                    text="continue_with"
                    width="100%"
                  />
                </div>
              </>
            )}

          </div>
        </div>
      ) : (
        <>
          {/* Modern Header / Navigation Bar */}
          <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
              <div className="bg-brand-blue text-white p-2 rounded-xl flex items-center justify-center font-bold tracking-tight shadow-md">
                <span className="text-lg">GE</span>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">GetEasy</span>
            </div>

            {/* Quick search bar (Desktop) */}
            {currentView === 'home' && (
              <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
                <input 
                  type="text" 
                  placeholder="Search smartphones, laptops, consoles..." 
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm text-slate-800 dark:text-slate-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3.5 top-2.5 h-4.5 w-4.5 text-slate-400" />
              </div>
            )}

            {/* Navigation Actions */}
            <nav className="flex items-center gap-1 sm:gap-4">
              
              <button 
                onClick={() => setCurrentView('ai-estimator')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  currentView === 'ai-estimator' 
                    ? 'bg-brand-blue/10 text-brand-blue' 
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">AI Pricing</span>
              </button>

              <button 
                onClick={() => setCurrentView('cart')}
                className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <ShoppingCart className="h-5 w-5" />
                {(currentUser.cart || []).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-blue text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {(currentUser.cart || []).length}
                  </span>
                )}
              </button>

              {/* Dynamic user role toggler */}
              <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-800 pl-2 sm:pl-4">
                <select 
                  className="text-xs bg-slate-100 dark:bg-slate-800 border-none rounded-lg p-1.5 text-slate-600 dark:text-slate-300 focus:outline-none"
                  value={currentUser.role}
                  onChange={(e) => {
                    const nextRole = e.target.value;
                    setCurrentUser(prev => ({ ...prev, role: nextRole }));
                    triggerToast(`Swapped to ${nextRole.toUpperCase()} view`);
                    if (nextRole === 'seller') setCurrentView('seller-dashboard');
                    else if (nextRole === 'admin') setCurrentView('admin-dashboard');
                    else setCurrentView('home');
                  }}
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>

                {currentUser.role === 'seller' && (
                  <button 
                    onClick={() => setCurrentView('seller-dashboard')}
                    className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-lg text-xs font-semibold hover:bg-indigo-100"
                  >
                    Dashboard
                  </button>
                )}

                {currentUser.role === 'admin' && (
                  <button 
                    onClick={() => setCurrentView('admin-dashboard')}
                    className="p-2 bg-rose-50 dark:bg-rose-900/30 text-rose-600 rounded-lg text-xs font-semibold hover:bg-rose-100 flex items-center gap-1"
                  >
                    <ShieldCheck className="h-3 w-3" /> Admin
                  </button>
                )}

                <div className="flex items-center gap-1.5 border-l border-slate-200 dark:border-slate-800 pl-2 sm:pl-4">
                  <div className="hidden lg:flex flex-col text-right">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none">{currentUser.name}</span>
                    <span className="text-[9px] text-slate-400 font-medium mt-0.5">{currentUser.email}</span>
                  </div>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('geteasy_token');
                      setIsLoggedIn(false);
                      triggerToast('Signed out of GetEasy.');
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                    title="Sign Out"
                  >
                    <LogOut className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>

            </nav>

          </div>
        </div>
      </header>

      {/* MAIN LAYOUTS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* HOMEPAGE VIEW */}
        {currentView === 'home' && (
          <div className="space-y-12 animate-fade-in">
            
            {/* Hero Banner Section */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-blue to-emerald-800 text-white p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-6 max-w-xl">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold tracking-wider">
                  <Star className="h-4.5 w-4.5 text-amber-300 fill-amber-300" /> Pre-Owned Electronics Marketplace
                </div>
                <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight">
                  Get Maximum Cash. Buy Trusted Devices.
                </h1>
                <p className="text-white/80 text-sm sm:text-base">
                  GetEasy is India’s premium recommerce platform with 100% verified listings, official AI pricing valuations, and seamless direct WhatsApp connections to verified sellers.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => setCurrentView('ai-estimator')}
                    className="px-6 py-3 bg-brand-green text-white font-bold rounded-xl shadow-lg hover:bg-emerald-600 transition-colors flex items-center gap-2"
                  >
                    Estimate Device Value
                  </button>
                  <a 
                    href="#catalog"
                    className="px-6 py-3 bg-white text-brand-blue font-bold rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    Browse Marketplace
                  </a>
                </div>
              </div>
              <div className="relative hidden lg:block w-72 h-72">
                {/* Modern visual layout container */}
                <div className="absolute inset-0 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute inset-4 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 flex flex-col justify-between shadow-2xl">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs">AI Price Estimate</span>
                    <span className="bg-brand-green text-[10px] px-2 py-0.5 rounded-full font-bold">96% Accuracy</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[10px] text-white/60">iPhone 13 (128GB)</div>
                    <div className="text-3xl font-black">₹34,800</div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-white/20 h-2 rounded"></div>
                    <div className="w-1/3 bg-brand-green h-2 rounded"></div>
                  </div>
                  <div className="text-[10px] text-white/50 text-center">Diagnostics Grade: Excellent</div>
                </div>
              </div>
            </div>

            {/* Categories Slider/Grid */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">Shop Pre-Owned by Category</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                {CATEGORIES.map((cat, idx) => {
                  const Icon = cat.icon;
                  return (
                    <div 
                      key={idx}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        const element = document.getElementById('catalog');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all cursor-pointer ${
                        selectedCategory === cat.name 
                          ? 'border-brand-blue bg-brand-blue/5 text-brand-blue ring-2 ring-brand-blue'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-brand-blue'
                      }`}
                    >
                      <Icon className="h-6 w-6 mb-2" />
                      <span className="text-xs font-bold text-center">{cat.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Marketplace Catalog Section */}
            <div id="catalog" className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">Explore Available Gear</h2>
                  <p className="text-xs text-slate-500">Every product undergoes extensive admin verification and grading quality reviews.</p>
                </div>
                
                {/* Condition filter and sorting actions */}
                <div className="flex gap-2 self-start sm:self-center">
                  <select 
                    className="text-xs border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 bg-white dark:bg-slate-900 font-medium"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="All">All Categories</option>
                    {CATEGORIES.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
                  </select>

                  <select 
                    className="text-xs border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 bg-white dark:bg-slate-900 font-medium"
                    value={selectedCondition}
                    onChange={(e) => setSelectedCondition(e.target.value)}
                  >
                    <option value="All">All Conditions</option>
                    <option value="Like New">Like New</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
              </div>

              {/* Product Cards Grid */}
              {activeProducts.length === 0 ? (
                <div className="text-center py-12 border border-dashed rounded-3xl border-slate-300 dark:border-slate-800">
                  <AlertCircle className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                  <p className="font-bold text-slate-600 dark:text-slate-400">No active products match your filter inputs.</p>
                  <button 
                    onClick={() => { setSelectedCategory('All'); setSelectedCondition('All'); setSearchQuery(''); }}
                    className="mt-3 text-sm text-brand-blue font-bold hover:underline"
                  >
                    Reset Active Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {activeProducts.map((p) => (
                    <div 
                      key={p.id}
                      onClick={() => {
                        setSelectedProduct(p);
                        setCurrentView('product');
                      }}
                      className="group cursor-pointer bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                        <img 
                          src={p.images[0]} 
                          alt={p.title} 
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Quality verified stamp badge */}
                        {p.isVerifiedListing && (
                          <span className="absolute top-3 left-3 bg-brand-blue text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                            <Check className="h-2.5 w-2.5" /> Verified Listing
                          </span>
                        )}
                        <button 
                          onClick={(e) => toggleWishlist(p.id, e)}
                          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/70 hover:bg-white backdrop-blur shadow-md text-slate-600 hover:text-red-500 transition-colors"
                        >
                          <Heart className={`h-4.5 w-4.5 ${currentUser.wishlist.includes(p.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>
                        <div className="absolute bottom-3 left-3 flex gap-1">
                          <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full ${
                            p.condition === 'Like New' ? 'bg-emerald-500 text-white' :
                            p.condition === 'Excellent' ? 'bg-brand-blue text-white' :
                            p.condition === 'Good' ? 'bg-amber-500 text-white' :
                            'bg-slate-500 text-white'
                          }`}>
                            Grade: {p.condition}
                          </span>
                        </div>
                      </div>

                      {/* Content panel */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-1">
                          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{p.category}</div>
                          <h3 className="font-bold text-slate-800 dark:text-white line-clamp-1 group-hover:text-brand-blue transition-colors">{p.title}</h3>
                          <p className="text-xs text-slate-500 line-clamp-2">{p.description}</p>
                        </div>

                        <div className="pt-2 flex justify-between items-end border-t border-slate-50 dark:border-slate-800">
                          <div>
                            <div className="text-xs text-slate-400 line-through">₹{p.originalPrice?.toLocaleString()}</div>
                            <div className="text-lg font-black text-slate-800 dark:text-white">₹{p.price.toLocaleString()}</div>
                          </div>
                          
                          {/* Green click to whatsapp action button directly on card! */}
                          <div className="flex gap-1">
                            <a
                              href={generateWhatsAppLink(p)}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => {
                                e.stopPropagation();
                                triggerToast('Redirecting to WhatsApp conversation...');
                              }}
                              className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-xl transition-colors"
                              title="Instant WhatsApp inquiry"
                            >
                              <Phone className="h-4.5 w-4.5" />
                            </a>
                            <button 
                              onClick={(e) => addToCart(p, e)}
                              className="p-2 bg-brand-blue/5 hover:bg-brand-blue/10 text-brand-blue rounded-xl transition-colors"
                            >
                              <ShoppingCart className="h-4.5 w-4.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* How GetEasy Works Section */}
            <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl p-8 sm:p-12 space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h2 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">How GetEasy Works</h2>
                <p className="text-sm text-slate-500">GetEasy removes the sketchiness and uncertainty from pre-owned gadget buying and trading.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex gap-4">
                  <div className="bg-brand-blue text-white font-bold h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg">1</div>
                  <div>
                    <h4 className="font-bold mb-1 text-slate-800 dark:text-white">Run AI Evaluation</h4>
                    <p className="text-xs text-slate-500">Sellers list their item details and screen scuffs. Our automated engine generates an instant cash value standard instantly.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-brand-green text-white font-bold h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg">2</div>
                  <div>
                    <h4 className="font-bold mb-1 text-slate-800 dark:text-white">Certified Verification</h4>
                    <p className="text-xs text-slate-500">Platform administrators evaluate listing credentials, verify the serial tags, and stamp listings with a verified quality mark.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-emerald-600 text-white font-bold h-10 w-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg">3</div>
                  <div>
                    <h4 className="font-bold mb-1 text-slate-800 dark:text-white">Direct WhatsApp Connect</h4>
                    <p className="text-xs text-slate-500">Buyers hit the green click-to-chat button, directly launching a WhatsApp chat with the prefilled product description.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Testimonials & Trust */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-6">
                <h3 className="text-xl font-black text-slate-800 dark:text-white">Buyer & Seller Guarantees</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Award className="h-6 w-6 text-brand-green shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-white">6 Months Guaranteed Warranty</h4>
                      <p className="text-xs text-slate-500">All certified listings automatically ship with 6 months warranty coverage backed directly by platform escrows.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-6 w-6 text-brand-blue shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-white">Secure Escrow Checkout</h4>
                      <p className="text-xs text-slate-500">Your payments remain safely locked in escrow until the item completes delivery diagnostics check.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-brand-blue/5 to-emerald-500/5 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-6">
                <h3 className="text-xl font-black text-slate-800 dark:text-white">What Users Say</h3>
                <div className="italic text-slate-600 dark:text-slate-300 text-sm">
                  "I was able to inspect the PS5 and buy it directly by negotiating on WhatsApp. The prefilled link made it so simple. The seller had a 'Usually replies in 10 mins' badge and she actually responded within 2 minutes! Super premium recommerce experience."
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-slate-200 rounded-full overflow-hidden flex items-center justify-center font-bold text-xs">AS</div>
                  <div>
                    <div className="font-bold text-xs text-slate-800 dark:text-white">Amit Shinde</div>
                    <div className="text-[10px] text-slate-400">Purchased a PS5 Consoles</div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="space-y-4 max-w-3xl mx-auto">
              <h2 className="text-2xl font-black text-center text-slate-800 dark:text-white mb-6">Frequently Asked Questions</h2>
              {[
                { q: "How does the WhatsApp Click-to-Chat help me?", a: "Instead of going through complicated messaging interfaces, buyers can click the WhatsApp button next to a listing. This instantly formats a details inquiry text on your phone’s WhatsApp application so you can directly close negotiations with sellers." },
                { q: "Can I sell my broken phone on GetEasy?", a: "Yes. During diagnostic setup inside our AI Estimator, toggle 'Functionality Check' to false. Our pricing system will automatically factor in component repairs and quote you a fair scrap valuation." },
                { q: "What commissions does GetEasy charge?", a: "We charge a small 8% platform escrow fee on transactions settled on-site. WhatsApp direct trades closed off-platform are subject to zero commissions!" }
              ].map((faq, index) => (
                <div key={index} className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-white dark:bg-slate-900">
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white mb-2">{faq.q}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* SINGLE PRODUCT VIEW */}
        {currentView === 'product' && selectedProduct && (
          <div className="space-y-12 animate-fade-in">
            
            {/* Back button */}
            <button 
              onClick={() => {
                setCurrentView('home');
                setSelectedProduct(null);
              }}
              className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 font-semibold"
            >
              <ArrowLeft className="h-4.5 w-4.5" /> Back to Catalog
            </button>

            {/* Main Product Info grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* Product Photos Panel */}
              <div className="space-y-4">
                <div className="aspect-video w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 dark:border-slate-800 relative">
                  <img 
                    src={selectedProduct.images[0]} 
                    alt={selectedProduct.title} 
                    className="object-cover w-full h-full"
                  />
                  {selectedProduct.isVerifiedListing && (
                    <span className="absolute top-4 left-4 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                      <Check className="h-4.5 w-4.5" /> Quality Verified listing
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {/* Mock thumbnail selection placeholders */}
                  {[selectedProduct.images[0], 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=300', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=300', 'https://images.unsplash.com/photo-1496181130204-7552cc145cdb?q=80&w=300'].map((img, i) => (
                    <div key={i} className="aspect-video rounded-xl overflow-hidden border border-slate-200 cursor-pointer hover:opacity-80">
                      <img src={img} alt="thumbnail" className="object-cover w-full h-full" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product description and actions */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex gap-1.5">
                    <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">{selectedProduct.category}</span>
                    <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-0.5 rounded-full">Brand: {selectedProduct.brand}</span>
                  </div>
                  <h1 className="text-3xl font-black text-slate-800 dark:text-white leading-tight">{selectedProduct.title}</h1>
                  
                  {/* Rating summary */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <Star className="h-4.5 w-4.5 text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold">{selectedProduct.seller.sellerRating}</span>
                    <span className="text-xs text-slate-400">({selectedProduct.viewsCount} views)</span>
                  </div>
                </div>

                {/* Price card */}
                <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl p-6 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 line-through">MRP: ₹{selectedProduct.originalPrice?.toLocaleString()}</span>
                    <div className="text-3xl font-black text-slate-800 dark:text-white">₹{selectedProduct.price.toLocaleString()}</div>
                    <span className="text-[10px] text-emerald-500 font-bold">You save {Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100)}%</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-500">AI Valuation Range:</div>
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      ₹{selectedProduct.aiEstimatedPriceMin?.toLocaleString()} - ₹{selectedProduct.aiEstimatedPriceMax?.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-brand-blue font-semibold">Pricing fits market standards!</span>
                  </div>
                </div>

                {/* Seller & Diagnostics check details */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">Device Diagnostic Grades</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                      <div className="text-[10px] text-slate-400">Device Condition</div>
                      <div className="font-bold text-xs text-slate-700 dark:text-slate-200">{selectedProduct.condition}</div>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                      <div className="text-[10px] text-slate-400">Battery Residual Health</div>
                      <div className="font-bold text-xs text-slate-700 dark:text-slate-200">{selectedProduct.conditionDetails.batteryHealth || 90}%</div>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                      <div className="text-[10px] text-slate-400">Panel & Screen Scratches</div>
                      <div className="font-bold text-xs text-slate-700 dark:text-slate-200">{selectedProduct.conditionDetails.screenScratch}</div>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                      <div className="text-[10px] text-slate-400">Mechanical Checklist</div>
                      <div className="font-bold text-xs text-emerald-600 flex items-center gap-1">
                        <CheckCircle className="h-3.5 w-3.5" /> All Checks Passed
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-xl flex items-center gap-3">
                    <Award className="h-5 w-5 text-indigo-500 shrink-0" />
                    <div className="text-xs text-indigo-800 dark:text-indigo-200 font-medium">
                      Coverage: <strong>{selectedProduct.warrantyDuration}</strong> is active.
                    </div>
                  </div>
                </div>

                {/* Seller info card */}
                <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-xs text-brand-blue border">
                      {selectedProduct.seller.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-800 dark:text-white flex items-center gap-1">
                        {selectedProduct.seller.name}
                        <span className="bg-emerald-50 text-emerald-600 text-[8px] font-bold px-1.5 py-0.5 rounded">Verified Seller</span>
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Replies {selectedProduct.seller.sellerResponseTime}
                      </div>
                    </div>
                  </div>

                  {/* Messaging Trigger */}
                  <button 
                    onClick={() => {
                      setActiveChatThread({ seller: selectedProduct.seller, product: selectedProduct });
                      setCurrentView('chat');
                    }}
                    className="text-xs text-slate-600 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white font-bold flex items-center gap-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 px-3 py-2 rounded-xl"
                  >
                    <MessageSquare className="h-4 w-4" /> Message Seller
                  </button>
                </div>

                {/* Actions & WhatsApp buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  {/* WhatsApp redirection click */}
                  <a
                    href={generateWhatsAppLink(selectedProduct)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      triggerToast('Logging chat intent. Launching WhatsApp...');
                    }}
                    className="flex-1 py-3 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors"
                  >
                    <Phone className="h-5 w-5 fill-white text-transparent" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <button 
                    onClick={() => addToCart(selectedProduct)}
                    className="px-6 py-3 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingCart className="h-5 w-5" /> Buy Now
                  </button>
                </div>

              </div>

            </div>

            {/* Product details description description */}
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-xl font-black text-slate-800 dark:text-white">Product Description</h3>
              <p className="text-xs text-slate-500 leading-relaxed bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6">
                {selectedProduct.description}
              </p>
            </div>

            {/* Similar products */}
            <div className="space-y-6">
              <h3 className="text-xl font-black text-slate-800 dark:text-white">Similar Listings You Might Like</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {products
                  .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id && p.status === 'Active')
                  .slice(0, 3)
                  .map(p => (
                    <div 
                      key={p.id}
                      onClick={() => {
                        setSelectedProduct(p);
                      }}
                      className="cursor-pointer bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 flex gap-4 hover:shadow-lg transition-all"
                    >
                      <img src={p.images[0]} alt={p.title} className="h-16 w-16 rounded-xl object-cover" />
                      <div className="space-y-1">
                        <h4 className="font-bold text-xs line-clamp-1">{p.title}</h4>
                        <div className="text-[10px] text-slate-400">Condition: {p.condition}</div>
                        <div className="font-black text-sm text-slate-800 dark:text-white">₹{p.price.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>
        )}

        {/* AI ESTIMATOR TOOL */}
        {currentView === 'ai-estimator' && (
          <div className="max-w-4xl mx-auto space-y-10 animate-fade-in">
            
            <div className="text-center max-w-xl mx-auto space-y-3">
              <TrendingUp className="h-10 w-10 text-brand-green mx-auto" />
              <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">GetEasy AI Price Estimator</h1>
              <p className="text-xs text-slate-500">Find the optimal buyback valuation for your device in seconds. Our algorithm compares specs, scuffs, and local market depreciations.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              
              {/* Parameter Settings Form */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-5">
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">Configure Device Parameters</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Category</label>
                    <select 
                      className="w-full text-xs border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2"
                      value={estimatorInputs.category}
                      onChange={(e) => setEstimatorInputs({ ...estimatorInputs, category: e.target.value })}
                    >
                      {CATEGORIES.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Original Retail Price (₹)</label>
                    <input 
                      type="number" 
                      className="w-full text-xs border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2"
                      value={estimatorInputs.originalPrice}
                      onChange={(e) => setEstimatorInputs({ ...estimatorInputs, originalPrice: parseFloat(e.target.value) || 0 })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">Device Condition Grade</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['Like New', 'Excellent', 'Good', 'Fair'].map((cond) => (
                        <button
                          key={cond}
                          type="button"
                          onClick={() => setEstimatorInputs({ ...estimatorInputs, condition: cond })}
                          className={`py-2 px-1 text-[10px] font-bold rounded-xl border transition-all ${
                            estimatorInputs.condition === cond 
                              ? 'border-brand-blue bg-brand-blue/5 text-brand-blue ring-2 ring-brand-blue'
                              : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:border-slate-400 text-slate-500'
                          }`}
                        >
                          {cond}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Diagnostic Specifics */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    <h4 className="font-bold text-xs text-slate-600">Specific Diagnostics Checks</h4>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">Screen Scratches</label>
                        <select 
                          className="w-full text-xs border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5"
                          value={estimatorInputs.screenScratch}
                          onChange={(e) => setEstimatorInputs({ ...estimatorInputs, screenScratch: e.target.value })}
                        >
                          <option value="None">None (Flawless)</option>
                          <option value="Micro">Micro Scratches</option>
                          <option value="Heavy">Heavy Scratches</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">Body Condition</label>
                        <select 
                          className="w-full text-xs border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5"
                          value={estimatorInputs.bodyCondition}
                          onChange={(e) => setEstimatorInputs({ ...estimatorInputs, bodyCondition: e.target.value })}
                        >
                          <option value="Flawless">Flawless (No dents)</option>
                          <option value="Minor Scuffs">Minor Scuffs</option>
                          <option value="Dents">Dents or Cracks</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] font-bold text-slate-500">Battery Residual Health</label>
                        <span className="text-[10px] font-bold text-brand-blue">{estimatorInputs.batteryHealth}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="50" 
                        max="100" 
                        className="w-full h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                        value={estimatorInputs.batteryHealth}
                        onChange={(e) => setEstimatorInputs({ ...estimatorInputs, batteryHealth: parseInt(e.target.value) })}
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                      <div>
                        <h5 className="font-bold text-xs text-slate-700 dark:text-slate-300">Basic Functionality Test</h5>
                        <p className="text-[10px] text-slate-400">Wi-Fi, Bluetooth, touch sensor response checks.</p>
                      </div>
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 text-brand-blue rounded border-slate-300 focus:ring-brand-blue"
                        checked={estimatorInputs.functionalityCheck}
                        onChange={(e) => setEstimatorInputs({ ...estimatorInputs, functionalityCheck: e.target.checked })}
                      />
                    </div>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={runAIPriceEstimation}
                  disabled={estimatingInProgress}
                  className="w-full py-3 bg-brand-green hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {estimatingInProgress ? (
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : <TrendingUp className="h-4 w-4" />}
                  <span>{estimatingInProgress ? 'Computing Valuation...' : 'Calculate AI Valuation'}</span>
                </button>

              </div>

              {/* Estimate Results display */}
              <div className="space-y-6">
                
                {estimatorResult ? (
                  <div className="bg-gradient-to-br from-brand-blue to-emerald-900 text-white border rounded-3xl p-8 space-y-6 shadow-2xl animate-slide-up">
                    <div className="text-center space-y-2">
                      <span className="bg-white/20 text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase">AI Price Estimate Payout</span>
                      <h4 className="text-4xl font-black">₹{estimatorResult.recommendedPrice.toLocaleString()}</h4>
                      <p className="text-xs text-white/70">Recommended listing price matching active metrics.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                      <div>
                        <div className="text-[10px] text-white/50">Minimum Resale Bound</div>
                        <div className="font-bold text-lg">₹{estimatorResult.minRange.toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-white/50">Maximum Resale Bound</div>
                        <div className="font-bold text-lg">₹{estimatorResult.maxRange.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="p-4 bg-white/10 rounded-2xl space-y-2">
                      <h5 className="font-bold text-xs flex items-center gap-1"><Award className="h-4 w-4 text-amber-300" /> GetEasy Valuation Factors</h5>
                      <ul className="text-[10px] text-white/80 space-y-1 list-disc pl-4">
                        <li>Annual depreciation for category: <strong>{estimatorInputs.category}</strong></li>
                        <li>Multiplier deduction for <strong>{estimatorInputs.condition}</strong> condition</li>
                        <li>Diagnostic scuffs penalty: {estimatorInputs.bodyCondition !== 'Flawless' ? 'applied' : 'none'}</li>
                        <li>Battery Health degradation impact: {estimatorInputs.batteryHealth < 85 ? 'applied' : 'none'}</li>
                      </ul>
                    </div>

                    <div className="flex gap-4">
                      <button 
                        onClick={() => {
                          setNewListing(prev => ({
                            ...prev,
                            category: estimatorInputs.category,
                            price: estimatorResult.recommendedPrice.toString(),
                            originalPrice: estimatorInputs.originalPrice.toString(),
                            condition: estimatorInputs.condition,
                            screenScratch: estimatorInputs.screenScratch,
                            bodyCondition: estimatorInputs.bodyCondition,
                            batteryHealth: estimatorInputs.batteryHealth,
                            functionalityCheck: estimatorInputs.functionalityCheck
                          }));
                          setCurrentView('seller-dashboard');
                          triggerToast('Inputs exported. Create listing now.');
                        }}
                        className="flex-1 py-3 bg-white text-brand-blue font-bold rounded-xl hover:bg-slate-100 transition-colors text-xs text-center"
                      >
                        Create Listing with AI Value
                      </button>
                    </div>

                  </div>
                ) : (
                  <div className="bg-slate-100 dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center flex flex-col justify-center items-center h-full min-h-[300px]">
                    <TrendingUp className="h-12 w-12 text-slate-300 dark:text-slate-700 mb-3" />
                    <h4 className="font-bold text-slate-700 dark:text-slate-300 mb-1">Awaiting Valuation Config</h4>
                    <p className="text-xs text-slate-500 max-w-xs">Configure the device parameters and click 'Calculate AI Valuation' to show pricing details.</p>
                  </div>
                )}

                <div className="border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Platform Valuation Benchmarks</h4>
                  <p className="text-xs text-slate-500">Smartphones preserve an average of 78% of retail value per year of age. Heavy graphic processors maintain 70%. Batteries below 85% receive a 1% payout deduction for every remaining single percent loss.</p>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* SELLER DASHBOARD VIEW */}
        {currentView === 'seller-dashboard' && (
          <div className="space-y-8 animate-fade-in">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-800 dark:text-white">Seller Dashboard</h1>
                <p className="text-xs text-slate-500">Track and manage your electronic listings, sales, and withdrawals.</p>
              </div>
              
              <div className="flex gap-4 p-4 bg-slate-100 dark:bg-slate-900 rounded-2xl">
                <div>
                  <div className="text-[10px] text-slate-400">Total Earnings</div>
                  <div className="text-xl font-black text-brand-green">₹{currentUser.earnings.toLocaleString()}</div>
                </div>
                <button 
                  onClick={() => {
                    if (currentUser.earnings <= 0) {
                      triggerToast('No earnings to withdraw', 'warning');
                      return;
                    }
                    triggerToast('Withdrawal request submitted!');
                    setCurrentUser(prev => ({ ...prev, earnings: 0 }));
                  }}
                  className="bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Withdraw
                </button>
              </div>
            </div>

            {/* Dashboard metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Active Listings</div>
                  <div className="text-3xl font-black">{products.filter(p => p.seller.id === currentUser.id && p.status === 'Active').length}</div>
                </div>
                <Smartphone className="h-10 w-10 text-brand-blue opacity-20" />
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Pending Approvals</div>
                  <div className="text-3xl font-black">{products.filter(p => p.seller.id === currentUser.id && p.status === 'Pending Approval').length}</div>
                </div>
                <Clock className="h-10 w-10 text-amber-500 opacity-20" />
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">Conversion Rate</div>
                  <div className="text-3xl font-black">94.8%</div>
                </div>
                <BarChart2 className="h-10 w-10 text-emerald-500 opacity-20" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Create Listing Panel */}
              <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  {editingProductId ? <Plus className="h-4.5 w-4.5 rotate-45 text-indigo-500 transition-transform" /> : <Plus className="h-4.5 w-4.5" />}
                  {editingProductId ? 'Edit Listing Details' : 'Submit New Listing'}
                </h3>
                
                <form onSubmit={submitNewListing} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Listing Title *</label>
                    <input 
                      type="text" 
                      placeholder="E.g., iPhone 13 Pro (128GB)"
                      required
                      className="w-full text-xs border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2"
                      value={newListing.title}
                      onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Category</label>
                      <select 
                        className="w-full text-xs border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2"
                        value={newListing.category}
                        onChange={(e) => setNewListing({ ...newListing, category: e.target.value })}
                      >
                        {CATEGORIES.map((c, i) => <option key={i} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Condition</label>
                      <select 
                        className="w-full text-xs border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2"
                        value={newListing.condition}
                        onChange={(e) => setNewListing({ ...newListing, condition: e.target.value })}
                      >
                        <option value="Like New">Like New</option>
                        <option value="Excellent">Excellent</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Price (₹) *</label>
                      <input 
                        type="number" 
                        required
                        className="w-full text-xs border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2"
                        value={newListing.price}
                        onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">Original Price (₹)</label>
                      <input 
                        type="number" 
                        className="w-full text-xs border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2"
                        value={newListing.originalPrice}
                        onChange={(e) => setNewListing({ ...newListing, originalPrice: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Add Picture Options section */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400">Add Picture Option *</label>
                    
                    {/* Grid of presets */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-medium">Select a preset matching device photo:</span>
                      <div className="grid grid-cols-3 gap-2">
                        {(PRESET_IMAGES[newListing.category] || PRESET_IMAGES['Accessories']).map((url, idx) => (
                          <div 
                            key={idx}
                            onClick={() => setNewListing(prev => ({ ...prev, images: [url] }))}
                            className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                              newListing.images?.[0] === url 
                                ? 'border-brand-blue ring-2 ring-brand-blue/30 scale-95' 
                                : 'border-slate-200 dark:border-slate-800 hover:border-brand-blue'
                            }`}
                          >
                            <img src={url} alt={`Preset ${idx + 1}`} className="object-cover w-full h-full" />
                            {newListing.images?.[0] === url && (
                              <div className="absolute inset-0 bg-brand-blue/35 flex items-center justify-center">
                                <Check className="h-5 w-5 text-white" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Or upload custom file */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-medium">Or upload a direct picture file:</span>
                      <div className="relative border border-dashed border-slate-350 dark:border-slate-700 rounded-xl p-3 text-center bg-slate-50 dark:bg-slate-800/20 hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors cursor-pointer flex flex-col items-center justify-center">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setNewListing(prev => ({ ...prev, images: [reader.result] }));
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Choose custom image file</span>
                        <span className="text-[9px] text-slate-400 mt-0.5">Supports PNG, JPG, JPEG</span>
                      </div>
                    </div>

                    {/* Image preview */}
                    {newListing.images?.[0] && (
                      <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
                        <img src={newListing.images[0]} alt="Listing Preview" className="object-cover w-full h-full" />
                        <button
                          type="button"
                          onClick={() => setNewListing(prev => ({ ...prev, images: [] }))}
                          className="absolute top-2 right-2 p-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full transition-colors shadow-lg"
                          title="Remove image"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                      <div>
                        <h5 className="font-bold text-[10px] text-slate-700 dark:text-slate-300">WhatsApp Link Public</h5>
                        <p className="text-[9px] text-slate-400">Buyers click to direct chat on WhatsApp.</p>
                      </div>
                      <input 
                        type="checkbox" 
                        className="h-3.5 w-3.5 text-brand-blue rounded border-slate-300"
                        checked={newListing.isWhatsAppBusiness}
                        onChange={(e) => setNewListing({ ...newListing, isWhatsAppBusiness: e.target.checked })}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className={`w-full py-2.5 text-white font-bold rounded-xl shadow text-xs transition-colors ${
                      editingProductId ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-brand-blue hover:bg-blue-600'
                    }`}
                  >
                    {editingProductId ? 'Update & Resubmit' : 'Submit for Approval'}
                  </button>
                </form>

              </div>

              {/* My active inventory */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">Your Marketplace Inventory</h3>
                
                <div className="space-y-4">
                  {products.filter(p => p.seller.id === currentUser.id).length === 0 ? (
                    <div className="text-center py-12 text-slate-400">No inventory created. Use the left panel to list items.</div>
                  ) : (
                    products.filter(p => p.seller.id === currentUser.id).map(p => (
                      <div key={p.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-slate-100 dark:border-slate-850 rounded-2xl gap-4">
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} alt={p.title} className="h-12 w-12 rounded-xl object-cover" />
                          <div>
                            <h4 className="font-bold text-xs text-slate-800 dark:text-white leading-snug">{p.title}</h4>
                            <div className="text-[10px] text-slate-400 flex items-center gap-1.5 pt-0.5">
                              <span>₹{p.price.toLocaleString()}</span>
                              <span>•</span>
                              <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${
                                p.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                p.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border border-rose-100' :
                                p.status === 'Changes Requested' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                                'bg-amber-50 text-amber-600 border border-amber-100'
                              }`}>{p.status}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {p.status !== 'Active' && (
                            <button
                              onClick={() => {
                                setEditingProductId(p.id);
                                setNewListing({
                                  title: p.title,
                                  description: p.description,
                                  category: p.category,
                                  brand: p.brand || 'Generic',
                                  modelName: p.modelName || 'Model V1',
                                  price: p.price,
                                  originalPrice: p.originalPrice || '',
                                  condition: p.condition || 'Excellent',
                                  screenScratch: p.conditionDetails?.screenScratch || 'None',
                                  bodyCondition: p.conditionDetails?.bodyCondition || 'Flawless',
                                  batteryHealth: p.conditionDetails?.batteryHealth || 90,
                                  functionalityCheck: p.conditionDetails?.functionalityCheck ?? true,
                                  warrantyDuration: p.warrantyDuration || '6 Months Seller Warranty',
                                  whatsappNumber: p.whatsappNumber || '+917500328988',
                                  isWhatsAppBusiness: p.isWhatsAppBusiness || false,
                                  preferredContactMethod: p.preferredContactMethod || 'WhatsApp',
                                  images: p.images || []
                                });
                                triggerToast('Loaded listing details into editor.');
                              }}
                              className="px-3 py-1.5 bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue font-bold rounded-lg text-xs"
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setSelectedProduct(p);
                              setCurrentView('product');
                            }}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300 font-semibold rounded-lg text-xs"
                          >
                            Preview Listing
                          </button>
                          <button
                            onClick={() => {
                              setProducts(prev => prev.filter(x => x.id !== p.id));
                              triggerToast('Inventory item deleted.');
                            }}
                            className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ADMIN DASHBOARD VIEW */}
        {currentView === 'admin-dashboard' && (
          <div className="space-y-8 animate-fade-in">
            
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-rose-500" />
              <div>
                <h1 className="text-3xl font-black text-slate-800 dark:text-white">Admin Management Console</h1>
                <p className="text-xs text-slate-500">Quality checking, user suspension, commission rates, and dispute resolution systems.</p>
              </div>
            </div>

            {/* Admin Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5">
                <div className="text-[10px] uppercase font-bold text-slate-400">Total Sales volume</div>
                <div className="text-2xl font-black text-slate-800 dark:text-white">₹4,89,200</div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5">
                <div className="text-[10px] uppercase font-bold text-slate-400">Commission Earned (8%)</div>
                <div className="text-2xl font-black text-brand-green">₹39,136</div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5">
                <div className="text-[10px] uppercase font-bold text-slate-400">Awaiting Quality Check</div>
                <div className="text-2xl font-black text-amber-500">{products.filter(p => p.status === 'Pending Approval').length}</div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5">
                <div className="text-[10px] uppercase font-bold text-slate-400">Escrow Disputes</div>
                <div className="text-2xl font-black text-rose-500">{disputes.length}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Product Approval Queue */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400 flex items-center gap-1.5"><ShieldAlert className="h-4.5 w-4.5 text-amber-500" /> Pending Quality Certification Queue</h3>
                
                <div className="space-y-4">
                  {products.filter(p => p.status === 'Pending Approval').length === 0 ? (
                    <div className="text-center py-12 text-slate-400">Certification queue clear. Zero pending listings.</div>
                  ) : (
                    products.filter(p => p.status === 'Pending Approval').map(p => (
                      <div key={p.id} className="p-4 border rounded-2xl space-y-3 bg-slate-50 dark:bg-slate-800/20">
                        <div className="flex gap-3">
                          <img src={p.images[0]} alt={p.title} className="h-14 w-14 rounded-xl object-cover shrink-0" />
                          <div>
                            <h4 className="font-bold text-xs text-slate-800 dark:text-white leading-tight">{p.title}</h4>
                            <p className="text-[10px] text-slate-500 line-clamp-1">{p.description}</p>
                            <div className="text-[9px] text-slate-400 pt-0.5">
                              Seller: <strong>{p.seller.name}</strong> ({p.seller.sellerRating} ★)
                            </div>
                          </div>
                        </div>

                        {/* Diagnostics specification review */}
                        <div className="grid grid-cols-2 gap-2 text-[9px] bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100">
                          <div>Grade: <strong>{p.condition}</strong></div>
                          <div>Battery: <strong>{p.conditionDetails.batteryHealth}%</strong></div>
                          <div>Scratches: <strong>{p.conditionDetails.screenScratch}</strong></div>
                          <div>Warranty: <strong>{p.warrantyDuration}</strong></div>
                        </div>

                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => rejectListingByAdmin(p.id)}
                            className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/20 text-rose-600 rounded-lg font-bold text-xs hover:bg-rose-100"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => requestChangesByAdmin(p.id)}
                            className="px-3 py-1.5 bg-amber-50 dark:bg-amber-950/20 text-amber-600 rounded-lg font-bold text-xs hover:bg-amber-100"
                          >
                            Request Changes
                          </button>
                          <button
                            onClick={() => approveListingByAdmin(p.id)}
                            className="px-3 py-1.5 bg-brand-green hover:bg-emerald-600 text-white rounded-lg font-bold text-xs shadow flex items-center gap-1"
                          >
                            <Check className="h-3.5 w-3.5" /> Approve & Certify
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>

              {/* Disputes & User Management list */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-6">
                
                {/* Active disputes */}
                <div className="space-y-3">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">Escrow Dispute Audits</h3>
                  
                  {disputes.map(disp => (
                    <div key={disp.id} className="p-4 border border-rose-100 dark:border-rose-900/30 rounded-2xl bg-rose-50/20 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-xs text-rose-800 dark:text-rose-200">{disp.item}</span>
                        <span className="bg-rose-50 text-rose-600 text-[8px] font-bold px-2 py-0.5 rounded uppercase">{disp.status}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-normal">
                        <strong>Reason:</strong> {disp.reason}
                      </p>
                      <div className="text-[9px] text-slate-400">
                        Buyer: {disp.buyer} | Seller: {disp.seller}
                      </div>
                      <div className="flex gap-2 justify-end pt-1">
                        <button 
                          onClick={() => {
                            setDisputes([]);
                            triggerToast('Dispute resolved: Refund issued to buyer.');
                          }}
                          className="px-2.5 py-1 bg-white hover:bg-slate-50 border text-slate-600 font-bold text-[9px] rounded-lg"
                        >
                          Refund Buyer
                        </button>
                        <button 
                          onClick={() => {
                            setDisputes([]);
                            triggerToast('Dispute resolved: Released payout to seller.');
                          }}
                          className="px-2.5 py-1 bg-brand-blue text-white font-bold text-[9px] rounded-lg"
                        >
                          Release Payout
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* User management list */}
                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">User Flag Controls</h3>
                  
                  <div className="space-y-3">
                    {[
                      { id: 'usr-1', name: 'Vikram Singh', email: 'vikram@gmail.com', status: 'Active', isWhatsAppVerified: false },
                      { id: 'usr-2', name: 'Rohan Sharma', email: 'rohan@gmail.com', status: 'Active', isWhatsAppVerified: true }
                    ].map(usr => (
                      <div key={usr.id} className="flex justify-between items-center p-3 border rounded-xl">
                        <div>
                          <div className="font-bold text-xs flex items-center gap-1.5">
                            {usr.name}
                            {usr.isWhatsAppVerified && (
                              <span className="bg-emerald-50 text-emerald-600 text-[8px] font-bold px-1 py-0.5 rounded">WhatsApp Verified</span>
                            )}
                          </div>
                          <div className="text-[9px] text-slate-400">{usr.email}</div>
                        </div>

                        <button
                          onClick={() => triggerToast(`User status set to Suspended.`)}
                          className="px-2.5 py-1 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-bold"
                        >
                          Suspend User
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* MESSAGING Direct Chat Interface */}
        {currentView === 'chat' && (
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl animate-fade-in flex flex-col h-[500px]">
            
            {/* Active Thread Details header */}
            <div className="bg-slate-50 dark:bg-slate-800/40 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-sm text-brand-blue">
                  {activeChatThread?.seller?.name?.charAt(0) || 'R'}
                </div>
                <div>
                  <h3 className="font-bold text-xs">{activeChatThread?.seller?.name || 'Rohan Sharma'}</h3>
                  <div className="text-[9px] text-emerald-500 font-semibold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Replies within 5 minutes
                  </div>
                </div>
              </div>
              
              {activeChatThread?.product && (
                <div className="flex items-center gap-2 border bg-white p-2 rounded-xl">
                  <img src={activeChatThread.product.images[0]} alt="p" className="h-8 w-8 rounded object-cover" />
                  <div className="text-left">
                    <div className="font-bold text-[10px] line-clamp-1">{activeChatThread.product.title}</div>
                    <div className="font-black text-xs">₹{activeChatThread.product.price.toLocaleString()}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Bubble list container */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-slate-50/50">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-3.5 rounded-2xl text-xs leading-normal shadow-sm ${
                    msg.sender === 'buyer' 
                      ? 'bg-brand-blue text-white rounded-tr-none' 
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border'
                  }`}>
                    <p>{msg.text}</p>
                    <div className={`text-[8px] text-right mt-1.5 ${msg.sender === 'buyer' ? 'text-white/60' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Submission action bar */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex gap-2">
              <input 
                type="text" 
                placeholder="Type your message details here..." 
                className="flex-1 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-blue"
                value={newMsgText}
                onChange={(e) => setNewMsgText(e.target.value)}
              />
              <button 
                type="submit"
                className="p-2.5 bg-brand-blue hover:bg-blue-600 text-white rounded-xl shadow-lg transition-colors flex items-center justify-center"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </form>

          </div>
        )}

        {/* SHOPPING CART VIEW */}
        {currentView === 'cart' && (
          <div className="max-w-4xl mx-auto space-y-10 animate-fade-in">
            
            <div>
              <h1 className="text-3xl font-black text-slate-800 dark:text-white">Your Shopping Cart</h1>
              <p className="text-xs text-slate-500">Secure escrow payment checkout processes.</p>
            </div>

            {(currentUser.cart || []).length === 0 ? (
              <div className="text-center py-12 border border-dashed rounded-3xl">
                <ShoppingCart className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                <p className="font-bold text-slate-600 dark:text-slate-400">Your shopping cart is currently empty.</p>
                <button 
                  onClick={() => setCurrentView('home')}
                  className="mt-2 text-xs text-brand-blue font-bold hover:underline"
                >
                  Return to Home Store
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Cart list */}
                <div className="lg:col-span-2 space-y-4">
                  {products
                    .filter(p => (currentUser.cart || []).includes(p.id))
                    .map(p => (
                      <div key={p.id} className="p-4 border rounded-2xl flex justify-between items-center bg-white dark:bg-slate-900">
                        <div className="flex gap-3 items-center">
                          <img src={p.images[0]} alt={p.title} className="h-12 w-12 rounded-xl object-cover shrink-0" />
                          <div>
                            <h4 className="font-bold text-xs line-clamp-1">{p.title}</h4>
                            <div className="text-[10px] text-slate-400">Condition: {p.condition}</div>
                            <div className="font-black text-xs text-slate-800 dark:text-white pt-0.5">₹{p.price.toLocaleString()}</div>
                          </div>
                        </div>
 
                        <button 
                          onClick={() => removeFromCart(p.id)}
                          className="p-2 text-slate-400 hover:text-red-500 rounded-lg"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    ))}
                </div>
 
                {/* Subtotal & Escrow Checkout summaries */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Checkout Summary</h3>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Subtotal</span>
                      <span className="font-semibold">
                        ₹{products
                          .filter(p => (currentUser.cart || []).includes(p.id))
                          .reduce((sum, p) => sum + p.price, 0)
                          .toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Quality diagnostics check</span>
                      <span className="font-semibold text-brand-green">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Logistics shipping</span>
                      <span className="font-semibold text-brand-green">Free</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-black text-sm pt-2">
                      <span>Total Payout</span>
                      <span className="text-brand-blue">
                        ₹{products
                          .filter(p => (currentUser.cart || []).includes(p.id))
                          .reduce((sum, p) => sum + p.price, 0)
                          .toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      triggerToast('Purchase successful! Shipping instructions sent to seller.');
                      setCurrentUser(prev => ({ ...prev, cart: [] }));
                      setCurrentView('home');
                    }}
                    className="w-full py-3 bg-brand-blue hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-colors text-xs"
                  >
                    Complete Checkout
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* Floating support widget (Simulating GetEasy WhatsApp Assistance) */}
      <a 
        href="https://wa.me/917500328988?text=Hi!%20I%20need%20assistance%20on%20GetEasy%20Marketplace."
        target="_blank"
        rel="noreferrer"
        onClick={() => triggerToast('Launching GetEasy Official WhatsApp Support Portals')}
        className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform duration-300 group"
        title="Contact GetEasy WhatsApp Support"
      >
        <Phone className="h-6 w-6 fill-white text-transparent" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold text-xs pl-0 group-hover:pl-2 whitespace-nowrap">
          WhatsApp Support
        </span>
      </a>

      {/* Premium responsive Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 mt-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-brand-blue text-white p-2 rounded-xl flex items-center justify-center font-bold tracking-tight">
                GE
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-brand-blue to-brand-green bg-clip-text text-transparent">GetEasy</span>
            </div>
            <p className="text-[10px] text-slate-400">GetEasy is India’s premier recommerce destination. Buy, sell, and trade quality certified gadgets with official AI estimates and click-to-chat links.</p>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase text-slate-400 mb-3">Shop Electronics</h4>
            <ul className="space-y-2 text-[11px] text-slate-500">
              <li><a href="#catalog" className="hover:text-brand-blue">Smartphones</a></li>
              <li><a href="#catalog" className="hover:text-brand-blue">MacBooks & Laptops</a></li>
              <li><a href="#catalog" className="hover:text-brand-blue">PlayStation & Xbox</a></li>
              <li><a href="#catalog" className="hover:text-brand-blue">Nvidia GPU Processors</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase text-slate-400 mb-3">Valuation Tools</h4>
            <ul className="space-y-2 text-[11px] text-slate-500">
              <li><button onClick={() => setCurrentView('ai-estimator')} className="hover:text-brand-blue text-left">Instant AI Estimator</button></li>
              <li><a href="#works" className="hover:text-brand-blue">How Pricing Works</a></li>
              <li><a href="#grading" className="hover:text-brand-blue">Diagnostics Grading Details</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs uppercase text-slate-400 mb-3">Support Channel</h4>
            <ul className="space-y-2 text-[11px] text-slate-500">
              <li><span className="text-slate-400">Official WhatsApp:</span> <a href="https://wa.me/917500328988" className="text-emerald-500 font-bold">+91 75003 28988</a></li>
              <li><span className="text-slate-400">Email:</span> support@geteasy.com</li>
              <li><span className="text-slate-400">Hours:</span> Mon-Sat 9AM-8PM</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 dark:border-slate-800 mt-8 pt-6 text-center text-[10px] text-slate-400">
          © {new Date().getFullYear()} GetEasy Technologies Private Limited. All rights reserved. Made for premium gadget recommerce.
        </div>
      </footer>
        </>
      )}

    </div>
  );
}
