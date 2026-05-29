const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile, verifyWhatsApp, verifyOtp, googleLogin } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.post('/google-login', googleLogin);
router.get('/profile', protect, getProfile);
router.put('/profile/update', protect, updateProfile);
router.post('/verify-whatsapp', protect, verifyWhatsApp);

module.exports = router;
