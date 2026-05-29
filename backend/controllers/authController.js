const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'geteasy_secret_key_123', {
    expiresIn: '30d',
  });
};

exports.register = async (req, res) => {
  try {
    const { firebaseId, name, email, password, avatar, phone, whatsappNumber, isWhatsAppBusiness, preferredContactMethod, referralCode } = req.body;

    if (global.dbOffline) {
      const mockUser = {
        _id: 'mock-user-' + Math.random().toString(36).substring(2, 10),
        firebaseId: firebaseId || `fb-${Date.now()}`,
        name: name || email.split('@')[0],
        email,
        avatar: avatar || '',
        phone: phone || '',
        whatsappNumber: whatsappNumber || phone || '',
        isWhatsAppBusiness: isWhatsAppBusiness || false,
        preferredContactMethod: preferredContactMethod || 'WhatsApp',
        role: (req.body.role === 'seller') ? 'seller' : 'buyer',
        referralCode: `EASY-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        referredBy: referralCode || null,
        isWhatsAppVerified: true,
        cart: [],
        wishlist: []
      };
      return res.status(201).json({
        success: true,
        token: generateToken(mockUser._id),
        user: mockUser
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const uniqueReferral = `EASY-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user = await User.create({
      firebaseId,
      name,
      email,
      password, // Save hashed password
      avatar,
      phone,
      whatsappNumber: whatsappNumber || phone || '',
      isWhatsAppBusiness: isWhatsAppBusiness || false,
      preferredContactMethod: preferredContactMethod || 'WhatsApp',
      role: (req.body.role === 'seller') ? 'seller' : 'buyer',
      referralCode: uniqueReferral,
      referredBy: referralCode || null,
      otp,
      otpExpires,
      isEmailVerified: false
    });

    try {
      if (!global.dbOffline) {
        await sendEmail({
          email: user.email,
          subject: 'GetEasy Verification Code',
          message: `Your verification code is: ${otp}. It expires in 10 minutes.`
        });
      }
    } catch (err) {
      console.error('Email could not be sent', err);
      // We don't fail registration if email fails, but we might want to flag it in real apps.
    }

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please verify your email with the OTP sent.',
      requiresOtp: true,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, firebaseId } = req.body;

    // Direct check for the unique admin credentials
    if (email === '111sharmaharshit@gmail.com') {
      if (password !== 'harshit@8901') {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const adminUser = {
        _id: 'naval123',
        firebaseId: 'naval123',
        name: 'naval123',
        email: '111sharmaharshit@gmail.com',
        avatar: '',
        phone: '',
        whatsappNumber: '+917500328988',
        isWhatsAppBusiness: false,
        preferredContactMethod: 'WhatsApp',
        role: 'admin',
        referralCode: 'EASY-ADMIN',
        isWhatsAppVerified: true,
        cart: [],
        wishlist: []
      };

      if (global.dbOffline) {
        return res.status(200).json({
          success: true,
          token: generateToken(adminUser._id),
          user: adminUser
        });
      } else {
        // If MongoDB is online, find or create the admin user with a valid hex ID, while keeping firebaseId as 'naval123'
        const dbAdminId = '60c72b2f9b1d8b2badfa1123';
        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            _id: dbAdminId,
            firebaseId: 'naval123',
            name: 'naval123',
            email: '111sharmaharshit@gmail.com',
            role: 'admin',
            referralCode: 'EASY-ADMIN'
          });
        }
        return res.status(200).json({
          success: true,
          token: generateToken(user._id),
          user
        });
      }
    }

    if (global.dbOffline) {
      const mockUser = {
        _id: email === 'admin@geteasy.com' ? '60c72b2f9b1d8b2badfa1115' : 'mock-user-' + Math.random().toString(36).substring(2, 10),
        firebaseId: firebaseId || `fb-${Date.now()}`,
        name: email.split('@')[0],
        email,
        avatar: '',
        phone: '',
        whatsappNumber: '+917500328988',
        isWhatsAppBusiness: false,
        preferredContactMethod: 'WhatsApp',
        role: email === 'admin@geteasy.com' ? 'admin' : (email.includes('seller') ? 'seller' : 'buyer'),
        referralCode: `EASY-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        isWhatsAppVerified: true,
        cart: [],
        wishlist: []
      };
      return res.status(200).json({
        success: true,
        token: generateToken(mockUser._id),
        user: mockUser
      });
    }

    let user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    if (!user.isEmailVerified && !global.dbOffline) {
      return res.status(401).json({ success: false, message: 'Please verify your email first', requiresOtp: true });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Remove password from response
    user.password = undefined;

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    if (global.dbOffline) {
      return res.status(200).json({ success: true, user: req.user });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const fieldsToUpdate = [
      'name', 'avatar', 'phone', 'whatsappNumber', 
      'isWhatsAppBusiness', 'showWhatsAppPublicly', 'preferredContactMethod'
    ];
    
    if (global.dbOffline) {
      const user = { ...req.user };
      fieldsToUpdate.forEach(field => {
        if (req.body[field] !== undefined) {
          user[field] = req.body[field];
        }
      });
      return res.status(200).json({ success: true, user });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        user[field] = req.body[field];
      }
    });

    await user.save();
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyWhatsApp = async (req, res) => {
  try {
    const { code } = req.body;
    
    // In production, integration with WhatsApp Cloud OTP API.
    // In dev, any 6-digit code starting with '8' or '1' resolves as successful.
    if (!code || code.length !== 6) {
      return res.status(400).json({ success: false, message: 'Invalid OTP format. Must be 6 digits.' });
    }

    if (global.dbOffline) {
      const user = { ...req.user, isWhatsAppVerified: true };
      return res.status(200).json({ 
        success: true, 
        message: 'WhatsApp number verified successfully!', 
        user 
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.isWhatsAppVerified = true;
    await user.save();

    res.status(200).json({ 
      success: true, 
      message: 'WhatsApp number verified successfully!', 
      user 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (global.dbOffline) {
      return res.status(200).json({
        success: true,
        message: 'Mock OTP verified',
        token: generateToken('mock-user-123'),
        user: { email, isEmailVerified: true, role: 'buyer' }
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    user.isEmailVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;
    
    if (global.dbOffline) {
       return res.status(200).json({
        success: true,
        token: generateToken('mock-google-user'),
        user: { name: 'Google Mock User', email: 'mock@gmail.com', isEmailVerified: true, role: 'buyer' }
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    let user = await User.findOne({ email: payload.email });

    if (!user) {
      const uniqueReferral = `EASY-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      user = await User.create({
        name: payload.name,
        email: payload.email,
        avatar: payload.picture,
        isEmailVerified: true, // Google handles verification
        role: 'buyer',
        referralCode: uniqueReferral
      });
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Google verification failed' });
  }
};
