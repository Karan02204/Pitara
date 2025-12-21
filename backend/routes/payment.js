import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/Order.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { sendOrderConfirmationEmail } from '../utils/emailService.js';

const router = express.Router();

// Lazy Razorpay instance getter (ensures env vars are loaded)
let razorpayInstance = null;
const getRazorpay = () => {
  if (!razorpayInstance) {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay credentials not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env file');
    }
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return razorpayInstance;
};

/**
 * POST /api/payment/create-order
 * Create a Razorpay order
 */
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;

    if (!amount) {
      return res.status(400).json({
        error: 'Amount is required',
        message: 'Please provide the order amount'
      });
    }

    // Create Razorpay order
    const options = {
      amount: Math.round(amount * 100), // Convert to paise (smallest currency unit)
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order: {
        id: order.id,
        currency: order.currency,
        amount: order.amount,
      },
      key: process.env.RAZORPAY_KEY_ID, // Send key ID to frontend
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      error: 'Failed to create payment order',
      message: error.message
    });
  }
});

/**
 * POST /api/payment/verify
 * Verify payment and create order in database
 */
router.post('/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData
    } = req.body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        error: 'Missing payment details',
        message: 'Payment verification failed'
      });
    }

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({
        error: 'Invalid signature',
        message: 'Payment verification failed'
      });
    }

    // Payment verified successfully, create order in database
    const { customerInfo, items, totalPrice, notes } = orderData;

    // Validate order data
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

    // Create new order with payment details
    const order = new Order({
      customerInfo,
      items,
      totalPrice,
      notes: notes || '',
      paymentStatus: 'paid',
      paymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      paymentSignature: razorpay_signature
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

    // Save order
    await order.save();

    // Add order to user's history if authenticated
    if (order.user) {
      await User.findByIdAndUpdate(order.user, { $push: { orders: order._id } });
    }

    // Send order confirmation email (don't block if email fails)
    try {
      await sendOrderConfirmationEmail(order);
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Continue anyway - order was created successfully
    }

    res.json({
      success: true,
      message: 'Payment verified and order created successfully',
      order
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      error: 'Failed to verify payment',
      message: error.message
    });
  }
});

export default router;
