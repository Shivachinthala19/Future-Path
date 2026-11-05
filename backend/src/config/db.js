import mongoose from 'mongoose';
import { ENV } from './env.js';

let mongod = null;

// Helper to mask credentials in MongoDB URI
const sanitizeUri = (uri) => {
  if (!uri) return '';
  return uri.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@)/, '$1******$3');
};

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  // 1. If an explicit MongoDB URI is provided, attempt connecting to it
  if (ENV.MONGODB_URI && ENV.MONGODB_URI.trim() !== '') {
    const safeUri = sanitizeUri(ENV.MONGODB_URI);
    try {
      await mongoose.connect(ENV.MONGODB_URI, {
        serverSelectionTimeoutMS: 2000,
      });
      console.log(`[Database] Connected successfully to MongoDB at: ${safeUri}`);
      return;
    } catch (err) {
      if (!ENV.USE_MEMORY_DB_FALLBACK) {
        console.error('[Database] MongoDB connection error:', err.message);
        throw err;
      }
      console.log(`[Database] External MongoDB not reachable (${err.message}). Using embedded knowledge graph engine...`);
    }
  }

  // 2. Embedded in-memory Knowledge Graph engine (Used when Supabase is primary database)
  if (ENV.USE_MEMORY_DB_FALLBACK) {
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      if (!mongod) {
        mongod = await MongoMemoryServer.create();
      }
      const memoryUri = mongod.getUri();
      await mongoose.connect(memoryUri);
      console.log(`[Knowledge Graph] Embedded dataset engine active (Supabase PostgreSQL is primary database).`);
      return;
    } catch (memErr) {
      console.error('[Knowledge Graph] Failed to initialize embedded engine:', memErr.message);
      throw memErr;
    }
  } else {
    throw new Error('No MongoDB URI provided and embedded fallback is disabled.');
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
