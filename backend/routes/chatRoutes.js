const express = require('express');
const router = express.Router();
const { getConversations, getMessages, sendMessage, logWhatsAppClick } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.get('/conversations', protect, getConversations);
router.get('/:conversationId', protect, getMessages);
router.post('/send', protect, sendMessage);
router.post('/whatsapp-click', logWhatsAppClick); // Public / optional user analytics logging

module.exports = router;
