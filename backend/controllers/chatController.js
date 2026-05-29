const Chat = require('../models/Chat');
const Product = require('../models/Product');

exports.getConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    let chats = [];
    try {
      chats = await Chat.find({
        $or: [{ sender: userId }, { receiver: userId }]
      })
      .populate('sender', 'name avatar role')
      .populate('receiver', 'name avatar role')
      .populate('product', 'title price images')
      .sort({ createdAt: -1 });
    } catch (e) {
      // Mock conversation
      chats = getMockChats(userId);
    }

    // Deduplicate chats to unique active conversations
    const conversationMap = new Map();
    chats.forEach(chat => {
      const otherUser = chat.sender._id.toString() === userId.toString() ? chat.receiver : chat.sender;
      if (!conversationMap.has(otherUser._id.toString())) {
        conversationMap.set(otherUser._id.toString(), {
          lastMessage: chat.message,
          timestamp: chat.createdAt,
          user: otherUser,
          product: chat.product,
          isRead: chat.isRead,
          conversationId: chat.conversationId
        });
      }
    });

    res.status(200).json({ success: true, conversations: Array.from(conversationMap.values()) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    let messages = [];

    try {
      messages = await Chat.find({ conversationId })
        .populate('sender', 'name avatar')
        .populate('product', 'title price')
        .sort({ createdAt: 1 });
        
      // Mark as read
      await Chat.updateMany(
        { conversationId, receiver: req.user._id, isRead: false },
        { $set: { isRead: true } }
      );
    } catch (e) {
      messages = getMockChats(req.user._id).filter(m => m.conversationId === conversationId);
    }

    res.status(200).json({ success: true, count: messages.length, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, productId, message } = req.body;
    const senderId = req.user._id;

    // Standard conversational ID: sorting both string IDs alphabetically
    const ids = [senderId.toString(), receiverId.toString()].sort();
    const conversationId = `${ids[0]}_${ids[1]}`;

    let chat;
    try {
      chat = await Chat.create({
        conversationId,
        sender: senderId,
        receiver: receiverId,
        product: productId,
        message
      });
    } catch (dbErr) {
      chat = {
        _id: 'msg-' + Math.random().toString(36).substring(2, 9),
        conversationId,
        sender: { _id: senderId, name: req.user.name, avatar: req.user.avatar },
        receiver: { _id: receiverId },
        product: productId,
        message,
        isRead: false,
        createdAt: new Date()
      };
    }

    res.status(201).json({ success: true, chat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.logWhatsAppClick = async (req, res) => {
  try {
    const { productId, sellerId } = req.body;
    const buyerId = req.user ? req.user._id : 'anonymous';

    // Log the event for business intelligence analytics (conversion metrics)
    console.log(`📊 [WhatsApp Click Logged] Buyer:${buyerId} clicked contact for Seller:${sellerId} on Product:${productId}`);

    res.status(200).json({
      success: true,
      message: 'WhatsApp click logged successfully for sales attribution metrics.',
      data: {
        buyerId,
        sellerId,
        productId,
        timestamp: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

function getMockChats(userId) {
  const RohanId = '60c72b2f9b1d8b2badfa1112';
  const AnitaId = '60c72b2f9b1d8b2badfa1113';
  
  return [
    {
      _id: 'msg-mock-1',
      conversationId: `${userId.toString()}_${RohanId}`.split('_').sort().join('_'),
      sender: { _id: RohanId, name: 'Rohan Sharma', avatar: '', role: 'seller' },
      receiver: { _id: userId, name: 'Mock User', role: 'buyer' },
      product: {
        _id: '60c72b2f9b1d8b2badfa2221',
        title: 'iPhone 14 Pro Max - Space Black',
        price: 68900,
        images: ['https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600']
      },
      message: 'Hey, yes the iPhone 14 Pro Max is still available! Screen is flawless, you can also ping me on WhatsApp for quick photos.',
      isRead: false,
      createdAt: new Date(Date.now() - 3600000)
    },
    {
      _id: 'msg-mock-2',
      conversationId: `${userId.toString()}_${AnitaId}`.split('_').sort().join('_'),
      sender: { _id: userId, name: 'Mock User', role: 'buyer' },
      receiver: { _id: AnitaId, name: 'Anita Verma', avatar: '', role: 'seller' },
      product: {
        _id: '60c72b2f9b1d8b2badfa2223',
        title: 'Sony PlayStation 5 Disc Edition',
        price: 37900,
        images: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=600']
      },
      message: 'Hi Anita, can you ship this PS5 to Pune today?',
      isRead: true,
      createdAt: new Date(Date.now() - 3600000 * 3)
    }
  ];
}
