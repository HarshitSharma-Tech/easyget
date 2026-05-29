const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firebaseId: { type: String, unique: true, sparse: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, select: false }, // Optional for Google Auth users
  isEmailVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpires: { type: Date },
  avatar: { type: String, default: '' },
  role: { type: String, enum: ['buyer', 'seller', 'admin'], default: 'buyer' },
  
  // WhatsApp & Contact settings
  phone: { type: String, default: '' },
  isWhatsAppVerified: { type: Boolean, default: false },
  whatsappNumber: { type: String, default: '' },
  isWhatsAppBusiness: { type: Boolean, default: false },
  showWhatsAppPublicly: { type: Boolean, default: true },
  preferredContactMethod: { 
    type: String, 
    enum: ['WhatsApp', 'Phone Call', 'Platform Chat', 'Email'], 
    default: 'WhatsApp' 
  },
  
  // Seller metrics
  sellerRating: { type: Number, default: 5.0 },
  sellerResponseTime: { type: String, default: 'Usually replies in 10 mins' },
  listingsCount: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 },
  
  // Relations
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  
  status: { type: String, enum: ['active', 'suspended', 'flagged'], default: 'active' },
  referralCode: { type: String, unique: true },
  referredBy: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
