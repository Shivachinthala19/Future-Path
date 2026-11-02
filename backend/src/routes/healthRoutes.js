import express from 'express';
import { testSupabaseConnection, isSupabaseConfigured } from '../config/supabase.js';
import mongoose from 'mongoose';

const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    General API & Primary Database (MongoDB) health check
 * @access  Public
 */
router.get('/', (req, res) => {
  const mongoState = mongoose.connection.readyState;
  const mongoStatusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  res.json({
    status: 'healthy',
    product: 'Future Path API',
    version: '1.0.0',
    primaryDatabase: {
      type: 'MongoDB',
      status: mongoStatusMap[mongoState] || 'unknown',
      connected: mongoState === 1
    },
    timestamp: new Date().toISOString()
  });
});

/**
 * @route   GET /api/health/supabase
 * @desc    Secondary Database (Supabase PostgreSQL) health & connection test
 * @access  Public
 */
router.get('/supabase', async (req, res) => {
  if (!isSupabaseConfigured()) {
    return res.status(200).json({
      success: false,
      database: 'supabase',
      connected: false,
      configured: false,
      message: 'Supabase credentials (SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY) are not configured in environment variables.'
    });
  }

  const result = await testSupabaseConnection();

  if (result.connected) {
    return res.status(200).json({
      success: true,
      database: 'supabase',
      connected: true,
      configured: true,
      tablesInitialized: result.tablesInitialized ?? false,
      message: result.message
    });
  } else {
    return res.status(503).json({
      success: false,
      database: 'supabase',
      connected: false,
      configured: true,
      error: result.error || result.message,
      message: result.message
    });
  }
});

export default router;
