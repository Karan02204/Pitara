import connectToDatabase from '../config/database.js';

/**
 * Middleware to ensure database connection before processing requests
 * For Vercel serverless functions
 */
export async function ensureDbConnection(req, res, next) {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ 
      error: 'Database connection failed',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
}

export default ensureDbConnection;
