const express = require('express');
const router = express.Router();
const { getAdminDashboard, getPendingApprovals, approveProduct, getUsers, updateUserStatus, getDisputes } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Protect all admin routes. In production: require 'admin' role. 
// For developer presentation ease: we authorize all active admin roles.
router.get('/dashboard', protect, authorize('admin'), getAdminDashboard);
router.get('/pending-approvals', protect, authorize('admin'), getPendingApprovals);
router.post('/approve-product/:id', protect, authorize('admin'), approveProduct);
router.get('/users', protect, authorize('admin'), getUsers);
router.put('/users/:id/status', protect, authorize('admin'), updateUserStatus);
router.get('/disputes', protect, authorize('admin'), getDisputes);

module.exports = router;
