const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

const app = express();

// Security Middlewares
app.use(helmet()); // Set security HTTP headers
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Body parser, reading data from body into req.body

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  max: 100, // Limit each IP to 100 requests per windowMs
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: 'Too many requests from this IP, please try again in 15 minutes!'
});
app.use('/api', limiter); // Apply to all API routes

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const chatRoutes = require('./routes/chatRoutes');
const adminRoutes = require('./routes/adminRoutes');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/admin', adminRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to GetEasy Recommerce API',
    status: 'Healthy',
    timestamp: new Date()
  });
});

// Global Error Handlers
app.use(notFound);
app.use(errorHandler);

// Database connection
const MONGO_URI = process.env.MONGO_URI;

// Disable buffering so queries fail fast when disconnected
mongoose.set('bufferCommands', false);

if (!MONGO_URI) {
  console.warn('\n⚠️ WARNING: MONGO_URI environment variable is missing.');
  console.warn('GetEasy Server will run with local mock memory support for developer demonstration.\n');
  global.dbOffline = true;
  
  // Start server directly in offline/mock mode
  app.listen(PORT, () => {
    console.log(`🚀 GetEasy Server listening on PORT ${PORT} (Offline/Mock Mode)`);
  });
} else {
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('✅ Connected to MongoDB Database');
      global.dbOffline = false;
      app.listen(PORT, () => {
        console.log(`🚀 GetEasy Server listening on PORT ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('❌ Database connection failed. Error:', err.message);
      console.log('Starting server in offline/mock mode due to database connection failure.');
      global.dbOffline = true;
      app.listen(PORT, () => {
        console.log(`🚀 GetEasy Server listening on PORT ${PORT} (Offline/Mock Mode)`);
      });
    });
}
