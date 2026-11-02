import { createClient } from '@supabase/supabase-js';
import { ENV } from './env.js';

let supabaseClient = null;
let supabaseAdminClient = null;

/**
 * Checks if Supabase credentials are configured in environment variables.
 */
export const isSupabaseConfigured = () => {
  return Boolean(
    ENV.SUPABASE_URL &&
    ENV.SUPABASE_URL.trim() !== '' &&
    ENV.SUPABASE_PUBLISHABLE_KEY &&
    ENV.SUPABASE_PUBLISHABLE_KEY.trim() !== ''
  );
};

/**
 * Returns the public / anon Supabase client instance.
 */
export const getSupabaseClient = () => {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!supabaseClient) {
    try {
      const apiKey = ENV.SUPABASE_SERVICE_ROLE_KEY || ENV.SUPABASE_PUBLISHABLE_KEY;
      supabaseClient = createClient(ENV.SUPABASE_URL, apiKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      });
    } catch (err) {
      console.warn('[Supabase] Client initialization warning:', err.message);
      return null;
    }
  }

  return supabaseClient;
};

/**
 * Returns the Supabase Admin (Service Role) client instance if configured.
 * (Used strictly on backend for administrative / migration operations).
 */
export const getSupabaseAdminClient = () => {
  const serviceKey = ENV.SUPABASE_SERVICE_ROLE_KEY || ENV.SUPABASE_PUBLISHABLE_KEY;

  if (!ENV.SUPABASE_URL || !serviceKey) {
    return null;
  }

  if (!supabaseAdminClient) {
    try {
      supabaseAdminClient = createClient(ENV.SUPABASE_URL, serviceKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false
        }
      });
    } catch (err) {
      console.warn('[Supabase] Admin client initialization warning:', err.message);
      return null;
    }
  }

  return supabaseAdminClient;
};

/**
 * Safe connection test helper.
 */
export const testSupabaseConnection = async () => {
  if (!isSupabaseConfigured()) {
    return {
      connected: false,
      configured: false,
      message: 'Supabase URL or Publishable Key not configured in environment variables.'
    };
  }

  try {
    const client = getSupabaseClient();
    if (!client) {
      return {
        connected: false,
        configured: true,
        message: 'Could not create Supabase client instance.'
      };
    }

    // Quick lightweight ping query against Supabase
    // We can query schema information or any lightweight table
    const { data, error } = await client.from('profiles').select('id').limit(1);

    if (error && error.code !== 'PGRST116' && !error.message?.includes('does not exist')) {
      // If table doesn't exist yet, Supabase connection itself is still reachable!
      if (error.code === '42P01') {
        return {
          connected: true,
          configured: true,
          tablesInitialized: false,
          message: 'Connected to Supabase PostgreSQL (tables not yet initialized, schema ready).'
        };
      }
      return {
        connected: false,
        configured: true,
        error: error.message,
        message: `Supabase returned: ${error.message}`
      };
    }

    return {
      connected: true,
      configured: true,
      tablesInitialized: true,
      message: 'Connected successfully to Supabase PostgreSQL database.'
    };
  } catch (err) {
    return {
      connected: false,
      configured: true,
      error: err.message,
      message: `Failed to connect to Supabase: ${err.message}`
    };
  }
};

export const supabase = getSupabaseClient();
export default supabase;
