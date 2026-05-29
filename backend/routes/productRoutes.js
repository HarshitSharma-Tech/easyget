const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, estimatePrice } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getProducts);
router.post('/estimate-price', estimatePrice);
router.get('/:id', getProductById);
router.post('/create', protect, createProduct);

module.exports = router;
