import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import giftsRouter from './routes/gifts.js';
import ordersRouter from './routes/orders.js';
import paymentRouter from './routes/payment.js';
import authRouter from './routes/auth.js';
import usersRouter from './routes/users.js';
import connectToDatabase from './config/database.js';
import ensureDbConnection from './middleware/dbConnect.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// CORS configuration - allow requests from any origin
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  credentials: false
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// For Vercel serverless, ensure DB connection on each request
if (process.env.VERCEL) {
  app.use(ensureDbConnection);
}

// Routes
app.use('/api/gifts', giftsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Gifty Hub API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!', 
    message: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// MongoDB Connection - use cached connection for Vercel serverless
// Initialize connection for local development
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('✅ Connected to MongoDB');
      app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
        console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
      });
    })
    .catch((error) => {
      console.error('❌ MongoDB connection error:', error);
      process.exit(1);
    });
} else {
  // For Vercel, connection will be established on first request
  connectToDatabase().catch(err => console.error('Initial DB connection failed:', err));
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});

// Export app for Vercel serverless function
export default app;

