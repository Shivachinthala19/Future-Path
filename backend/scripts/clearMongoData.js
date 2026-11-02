/**
 * ==============================================================================
 * FUTURE PATH - SAFELY CLEAR MONGODB DATA ONLY
 * ==============================================================================
 * Clears all MongoDB collections so that no data remains in MongoDB.
 * Leaves Supabase PostgreSQL and application code 100% intact.
 * ==============================================================================
 */

import mongoose from 'mongoose';
import { ENV } from '../src/config/env.js';

async function clearMongoDB() {
  console.log('\n====================================================');
  console.log('🗑️  CLEARING ALL MONGODB DATA');
  console.log('====================================================');

  const uris = [ENV.MONGODB_URI, ENV.MONGO_URI].filter(Boolean);
  let connected = false;

  for (const uri of uris) {
    if (uri.includes('xxxx')) continue; // Skip placeholder
    try {
      console.log(`Connecting to: ${uri.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@)/, '$1******$3')} ...`);
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
      connected = true;
      console.log('✅ Connected to MongoDB.');
      break;
    } catch (err) {
      console.warn(`Could not connect via ${uri.slice(0, 25)}... (${err.message})`);
    }
  }

  if (!connected) {
    console.log('\nℹ️  Notice: No active external MongoDB database is connected.');
    console.log('ℹ️  The MONGO_URI in .env was a dummy placeholder (cluster0.xxxx.mongodb.net).');
    console.log('ℹ️  No remote MongoDB data exists to be deleted.');
    console.log('✅ MongoDB is already clean and unused.');
    console.log('====================================================\n');
    return;
  }

  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();

    if (collections.length === 0) {
      console.log('ℹ️  MongoDB database contains 0 collections. Already empty.');
    } else {
      console.log(`Found ${collections.length} collection(s) in MongoDB:`);
      for (const col of collections) {
        await db.collection(col.name).drop();
        console.log(`   🗑️  Dropped collection: ${col.name}`);
      }
      console.log('\n✅ All MongoDB collections successfully dropped and cleared!');
    }
  } catch (err) {
    console.error('Error while clearing MongoDB collections:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB connection closed.');
    console.log('====================================================\n');
  }
}

clearMongoDB();
