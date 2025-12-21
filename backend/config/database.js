import mongoose from 'mongoose';

let cachedDb = null;
let connectionPromise = null;

export async function connectToDatabase() {
  // Already connected
  if (cachedDb && mongoose.connection.readyState === 1) {
    console.log('Using cached database connection');
    return cachedDb;
  }

  // Connection in progress - wait for it
  if (connectionPromise) {
    console.log('Waiting for existing connection attempt...');
    return connectionPromise;
  }

  // Start new connection
  connectionPromise = (async () => {
    try {
      const opts = {
        bufferCommands: true, // Allow buffering during connection
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000, // Increased timeout for cold starts
        socketTimeoutMS: 45000,
      };

      if (!process.env.MONGODB_URI) {
        throw new Error('MONGODB_URI environment variable is not defined');
      }

      const db = await mongoose.connect(process.env.MONGODB_URI, opts);
      cachedDb = db;
      console.log('✅ Connected to MongoDB');
      return db;
    } catch (error) {
      console.error('❌ MongoDB connection error:', error.message);
      connectionPromise = null; // Reset so we can retry
      throw error;
    }
  })();

  return connectionPromise;
}

export default connectToDatabase;
