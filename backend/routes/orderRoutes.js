const express = require('express');
const router = express.Router();
const { createPaymentIntent, placeOrder, getMyPurchases, getMySales, updateTracking } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-payment-intent', protect, createPaymentIntent);
router.post('/place-order', protect, placeOrder);
router.get('/my-purchases', protect, getMyPurchases);
router.get('/my-sales', protect, getMySales);
router.put('/:id/tracking', protect, updateTracking);

module.exports = router;
