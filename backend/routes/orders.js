import express from 'express';
import Order from '../models/Order.js';
import { sendOrderConfirmationEmail } from '../utils/emailService.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// POST create new order
router.post('/', async (req, res) => {
  try {
    const { customerInfo, items, totalPrice, notes } = req.body;

    // Validate required fields
    if (!customerInfo || !items || !totalPrice) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        message: 'customerInfo, items, and totalPrice are required'
      });
    }

    if (!items.length) {
      return res.status(400).json({ 
        error: 'Invalid order',
        message: 'Order must contain at least one item'
      });
    }

    // Create new order
    const order = new Order({
      customerInfo,
      items,
      totalPrice,
      notes: notes || ''
    });

    // Check for authentication token to link user
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        order.user = decoded.id;
      } catch (err) {
        console.log('Token verification failed for order creation', err.message);
        // Continue creating order as guest
      }
    }

    // Save order AFTER setting user field
    await order.save();
    
    // Add order to user's history if authenticated
    if (order.user) {
      await User.findByIdAndUpdate(order.user, { $push: { orders: order._id } });
    }

    // Send order confirmation email (don't block order creation if email fails)
    try {
      await sendOrderConfirmationEmail(order);
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Continue anyway - order was created successfully
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ 
      error: 'Failed to create order', 
      message: error.message 
    });
  }
});

// GET order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.giftId');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ 
      error: 'Failed to fetch order', 
      message: error.message 
    });
  }
});

// GET order by order number
router.get('/number/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber })
      .populate('items.giftId');

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ 
      error: 'Failed to fetch order', 
      message: error.message 
    });
  }
});

// GET all orders (admin functionality)
router.get('/', async (req, res) => {
  try {
    const { status, email, limit = 50, page = 1 } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    if (email) {
      query['customerInfo.email'] = email.toLowerCase();
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .populate('items.giftId');

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ 
      error: 'Failed to fetch orders', 
      message: error.message 
    });
  }
});

// PUT update order status (admin functionality)
router.put('/:id/status', async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(400).json({ 
      error: 'Failed to update order', 
      message: error.message 
    });
  }
});

export default router;
