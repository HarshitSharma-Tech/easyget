const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  price: { type: Number, required: true },
  commissionFee: { type: Number, required: true }, // Platform fee
  sellerEarnings: { type: Number, required: true }, // Seller net cut
  
  paymentDetails: {
    paymentId: { type: String },
    gateway: { type: String, enum: ['Stripe', 'Razorpay', 'Wallet'], default: 'Stripe' },
    status: { type: String, enum: ['Pending', 'Completed', 'Failed', 'Refunded'], default: 'Pending' }
  },
  
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, default: 'India' }
  },
  
  trackingDetails: {
    carrier: { type: String, default: 'GetEasy Logistics' },
    trackingNumber: { type: String },
    status: { 
      type: String, 
      enum: ['Order Placed', 'Quality Check Passed', 'Dispatched', 'In Transit', 'Out for Delivery', 'Delivered', 'Cancelled'],
      default: 'Order Placed' 
    },
    updatedAt: { type: Date, default: Date.now }
  },
  
  dispute: { type: mongoose.Schema.Types.ObjectId, ref: 'Dispute' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
