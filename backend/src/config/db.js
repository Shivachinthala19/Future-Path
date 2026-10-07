import mongoose from 'mongoose';
import { ENV } from './env.js';

let mongod = null;

// Helper to mask credentials in MongoDB URI
const sanitizeUri = (uri) => {
  if (!uri) return '';
  return uri.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@)/, '$1******$3');
};

export const connectDB = async () => {
  const safeUri = sanitizeUri(ENV.MONGODB_URI);

  try {
    // Attempt connecting to configured URI
    await mongoose.connect(ENV.MONGODB_URI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`[Database] Connected successfully to MongoDB at: ${safeUri}`);
  } catch (err) {
    if (ENV.USE_MEMORY_DB_FALLBACK) {
      console.warn(`[Database] Could not connect to remote MongoDB at ${safeUri}. Initializing embedded in-memory MongoDB fallback...`);
      try {
        const { MongoMemoryServer } = await import('mongodb-memory-server');
        mongod = await MongoMemoryServer.create();
        const memoryUri = mongod.getUri();
        await mongoose.connect(memoryUri);
        console.log(`[Database] Connected to in-memory MongoDB instance at: ${memoryUri}`);
        return;
      } catch (memErr) {
        console.error('[Database] Failed to initialize in-memory MongoDB:', memErr.message);
        throw memErr;
      }
    } else {
      console.error('[Database] MongoDB connection error:', err.message);
      throw err;
    }
  }
};

export const closeDB = async () => {
  try {
    await mongoose.disconnect();
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    console.error('[Database] Error closing DB connection:', err.message);
  }
};
