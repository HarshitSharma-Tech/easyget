const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Robust check for offline/mock development tokens
      if (token.startsWith('mock-')) {
        const mockRole = token.split('-')[1]; // E.g., mock-seller, mock-buyer, mock-admin
        const mockUserId = token.split('-')[2] || '60c72b2f9b1d8b2badfa1111';
        
        req.user = {
          _id: mockUserId,
          name: `Mock ${mockRole.charAt(0).toUpperCase() + mockRole.slice(1)}`,
          email: `${mockRole}@geteasy.com`,
          role: mockRole === 'seller' ? 'seller' : mockRole === 'admin' ? 'admin' : 'buyer',
          whatsappNumber: '+919876543210',
          isWhatsAppVerified: true
        };
        return next();
      }

      // Standard JWT handling
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'geteasy_secret_key_123');

      // Fetch user from DB or return mock details if DB is offline
      if (global.dbOffline) {
        const isAdmin = decoded.id.startsWith('mock-admin') || 
                        decoded.id === '60c72b2f9b1d8b2badfa1115' || 
                        decoded.id === '60c72b2f9b1d8b2badfa1123' || 
                        decoded.id === 'naval123';
        req.user = {
          _id: decoded.id,
          name: isAdmin ? 'naval123' : 'Harshit Sharma',
          email: isAdmin ? '111sharmaharshit@gmail.com' : 'harshit@gmail.com',
          role: isAdmin ? 'admin' : (decoded.id.includes('seller') ? 'seller' : 'buyer'),
          whatsappNumber: '+917500328988',
          isWhatsAppVerified: true
        };
        return next();
      }

      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
      }
      
      next();
    } catch (error) {
      console.error('Authentication error:', error.message);
      res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: User role '${req.user ? req.user.role : 'none'}' is not authorized to access this route`
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
