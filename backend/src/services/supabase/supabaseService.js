import bcrypt from 'bcryptjs';
import { getSupabaseClient, getSupabaseAdminClient, isSupabaseConfigured, testSupabaseConnection } from '../../config/supabase.js';

/**
 * Supabase Primary Database Service
 * Serves all core models directly from Supabase PostgreSQL.
 */
export class SupabaseService {
  /**
   * Health and connectivity check
   */
  static async checkConnection() {
    return await testSupabaseConnection();
  }

  // ==========================================================================
  // USERS & PROFILES AUTHENTICATION
  // ==========================================================================

  static async findUserByEmail(email) {
    if (!isSupabaseConfigured() || !email) return null;
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const { data, error } = await client
        .from('profiles')
        .select('*')
        .ilike('email', email.trim().toLowerCase())
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      // Extract passwordHash from preferences JSONB or direct column
      const passwordHash = data.preferences?.password_hash || data.password_hash || null;

      return {
        _id: data.id,
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role || 'user',
        passwordHash,
        matchPassword: async (enteredPassword) => {
          if (!passwordHash) return false;
          return await bcrypt.compare(enteredPassword, passwordHash);
        },
        currentEducation: {
          name: data.current_education || '',
          status: data.education_status || 'completed'
        },
        careerGoal: {
          targetCareer: data.target_career || '',
          targetJobRole: data.target_job || ''
        },
        skills: data.skills || [],
        headline: data.headline || '',
        location: data.location || { country: 'India', city: '' },
        preferences: data.preferences || {}
      };
    } catch (err) {
      console.warn('[SupabaseService] findUserByEmail error:', err.message);
      return null;
    }
  }

  static async findUserById(id) {
    if (!isSupabaseConfigured() || !id) return null;
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const { data, error } = await client
        .from('profiles')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        _id: data.id,
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role || 'user',
        currentEducation: {
          name: data.current_education || '',
          status: data.education_status || 'completed'
        },
        careerGoal: {
          targetCareer: data.target_career || '',
          targetJobRole: data.target_job || ''
        },
        skills: data.skills || [],
        headline: data.headline || '',
        location: data.location || { country: 'India', city: '' },
        preferences: data.preferences || {}
      };
    } catch (err) {
      console.warn('[SupabaseService] findUserById error:', err.message);
      return null;
    }
  }

  static async createUser({ name, email, password, currentEducation, targetCareer }) {
    if (!isSupabaseConfigured()) throw new Error('Supabase is not configured.');
    const client = getSupabaseClient();
    if (!client) throw new Error('Could not instantiate Supabase client.');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const preferences = {
      password_hash: passwordHash,
      learningMode: 'hybrid',
      willingToRelocate: true,
      availableWeeklyHours: 15
    };

    const row = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: 'user',
      headline: 'Lifelong Learner & Career Explorer',
      current_education: typeof currentEducation === 'string' ? currentEducation : currentEducation?.name || '',
      education_status: 'completed',
      target_career: targetCareer || '',
      target_job: targetCareer || '',
      preferences
    };

    const { data, error } = await client
      .from('profiles')
      .insert([row])
      .select()
      .single();

    if (error) throw error;

    return {
      _id: data.id,
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role || 'user',
      currentEducation: {
        name: data.current_education || '',
        status: 'completed'
      },
      careerGoal: {
        targetCareer: data.target_career || ''
      }
    };
  }

  static async updateUserProfile(id, updates = {}) {
    if (!isSupabaseConfigured() || !id) return null;
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const updatePayload = {
        updated_at: new Date().toISOString()
      };

      if (updates.name) updatePayload.name = updates.name;
      if (updates.headline) updatePayload.headline = updates.headline;
      if (updates.location) updatePayload.location = updates.location;
      if (updates.currentEducation?.name) updatePayload.current_education = updates.currentEducation.name;
      if (updates.careerGoal?.targetCareer) updatePayload.target_career = updates.careerGoal.targetCareer;
      if (updates.preferences) updatePayload.preferences = updates.preferences;

      const { data, error } = await client
        .from('profiles')
        .update(updatePayload)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('[SupabaseService] updateUserProfile error:', err.message);
      return null;
    }
  }

  // ==========================================================================
  // STUDIES & COURSES
  // ==========================================================================

  static async getStudies({ category, search, limit = 100 } = {}) {
    if (!isSupabaseConfigured()) return [];
    const client = getSupabaseClient();
    if (!client) return [];

    try {
      let query = client.from('studies').select('*').limit(limit);

      if (category && category !== 'All') {
        query = query.eq('category', category);
      }
      if (search) {
        query = query.ilike('name', `%${search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.warn('[SupabaseService] getStudies warning:', err.message);
      return [];
    }
  }

  static async getStudyById(id) {
    if (!isSupabaseConfigured() || !id) return null;
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      let query = client.from('studies').select('*');
      if (id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        query = query.eq('id', id);
      } else {
        query = query.eq('slug', id.toLowerCase());
      }

      const { data, error } = await query.maybeSingle();
      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('[SupabaseService] getStudyById error:', err.message);
      return null;
    }
  }

  // ==========================================================================
  // JOBS (PRIVATE & GOVT)
  // ==========================================================================

  static async getJobs({ category, search, limit = 100 } = {}) {
    if (!isSupabaseConfigured()) return [];
    const client = getSupabaseClient();
    if (!client) return [];

    try {
      let query = client.from('jobs').select('*').limit(limit);

      if (category && category !== 'All') {
        query = query.eq('category', category);
      }
      if (search) {
        query = query.ilike('title', `%${search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.warn('[SupabaseService] getJobs warning:', err.message);
      return [];
    }
  }

  static async getJobById(id) {
    if (!isSupabaseConfigured() || !id) return null;
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      let query = client.from('jobs').select('*');
      if (id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        query = query.eq('id', id);
      } else {
        query = query.eq('slug', id.toLowerCase());
      }

      const { data, error } = await query.maybeSingle();
      if (error) throw error;
      return data;
    } catch (err) {
      console.warn('[SupabaseService] getJobById error:', err.message);
      return null;
    }
  }

  // ==========================================================================
  // EXAMS, SKILLS, CERTIFICATIONS & CAREERS
  // ==========================================================================

  static async getExams({ category, limit = 100 } = {}) {
    if (!isSupabaseConfigured()) return [];
    const client = getSupabaseClient();
    if (!client) return [];

    try {
      let query = client.from('exams').select('*').limit(limit);
      if (category && category !== 'All') {
        query = query.eq('category', category);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.warn('[SupabaseService] getExams warning:', err.message);
      return [];
    }
  }

  static async getSkills({ limit = 100 } = {}) {
    if (!isSupabaseConfigured()) return [];
    const client = getSupabaseClient();
    if (!client) return [];

    try {
      const { data, error } = await client.from('skills').select('*').limit(limit);
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.warn('[SupabaseService] getSkills warning:', err.message);
      return [];
    }
  }

  static async getCertifications({ limit = 100 } = {}) {
    if (!isSupabaseConfigured()) return [];
    const client = getSupabaseClient();
    if (!client) return [];

    try {
      const { data, error } = await client.from('certifications').select('*').limit(limit);
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.warn('[SupabaseService] getCertifications warning:', err.message);
      return [];
    }
  }

  static async getCareers({ limit = 100 } = {}) {
    if (!isSupabaseConfigured()) return [];
    const client = getSupabaseClient();
    if (!client) return [];

    try {
      const { data, error } = await client.from('careers').select('*').limit(limit);
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.warn('[SupabaseService] getCareers warning:', err.message);
      return [];
    }
  }

  static async getEducationLevels() {
    if (!isSupabaseConfigured()) return [];
    const client = getSupabaseClient();
    if (!client) return [];

    try {
      const { data, error } = await client.from('education_levels').select('*').order('tier_order');
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.warn('[SupabaseService] getEducationLevels warning:', err.message);
      return [];
    }
  }

  // ==========================================================================
  // CONVERSATIONS & CHAT HISTORY
  // ==========================================================================

  static async saveConversation({ conversationId, userId, title, userContext, messages = [] } = {}) {
    if (!isSupabaseConfigured()) return null;
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const { data: conv, error: convError } = await client
        .from('conversations')
        .upsert(
          {
            conversation_id: conversationId,
            title: title || 'Guidance Session',
            user_context: userContext || {},
            last_active_at: new Date().toISOString()
          },
          { onConflict: 'conversation_id' }
        )
        .select()
        .single();

      if (convError) throw convError;

      if (messages.length > 0) {
        const messageRows = messages.map((m) => ({
          conversation_id: conversationId,
          role: m.role,
          content: m.content,
          structured_data: m.structuredData || null
        }));

        await client.from('conversation_messages').insert(messageRows);
      }

      return conv;
    } catch (err) {
      console.warn('[SupabaseService] saveConversation warning:', err.message);
      return null;
    }
  }

  static async getConversation(conversationId) {
    if (!isSupabaseConfigured() || !conversationId) return null;
    const client = getSupabaseClient();
    if (!client) return null;

    try {
      const { data: conv } = await client
        .from('conversations')
        .select('*, messages:conversation_messages(*)')
        .eq('conversation_id', conversationId)
        .maybeSingle();

      return conv;
    } catch (err) {
      console.warn('[SupabaseService] getConversation error:', err.message);
      return null;
    }
  }
}

export default SupabaseService;
