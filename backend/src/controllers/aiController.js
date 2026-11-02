import { AIService } from '../services/aiService.js';
import { CareerTwin } from '../models/CareerTwin.js';
import { User } from '../models/User.js';
import { Conversation } from '../models/Conversation.js';
import crypto from 'crypto';

/**
 * AI Chat Controller
 * Executes verified RAG guidance, conversation persistence, and structured outputs
 */
export const chatWithAI = async (req, res, next) => {
  try {
    const { message, conversationId: incomingConversationId, context } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message is required.'
      });
    }

    let userContext = {};
    let careerTwin = null;
    let dbUser = null;

    // 1. If user is authenticated, retrieve verified database profile
    if (req.user) {
      dbUser = await User.findById(req.user._id).lean();
      careerTwin = await CareerTwin.findOne({ user: req.user._id }).lean();

      if (dbUser) {
        userContext = {
          userId: dbUser._id,
          name: dbUser.name,
          currentEducation: dbUser.currentEducation?.name || dbUser.educationName || dbUser.education || 'B.Com',
          educationStatus: dbUser.currentEducation?.status || 'completed',
          specialization: dbUser.currentEducation?.specialization || dbUser.specialization || '',
          skills: Array.isArray(dbUser.skills) && dbUser.skills.length > 0 ? dbUser.skills : (careerTwin?.skills || []),
          targetJob: dbUser.targetJob?.targetJobName || dbUser.careerGoal?.targetCareer || 'Data Analyst',
          goal: dbUser.careerGoal?.targetCareer || 'Job',
          location: dbUser.location?.city ? `${dbUser.location.city}, ${dbUser.location.country}` : 'India'
        };
      }
    }

    // 2. Merge with any guest session context safely
    if (!dbUser && context) {
      userContext = {
        name: context.name || 'Explorer',
        currentEducation: context.currentEducation || context.education || context.study || 'B.Com',
        educationStatus: context.status || 'completed',
        specialization: context.specialization || '',
        skills: Array.isArray(context.skills) ? context.skills : [],
        targetJob: context.targetJob || 'Data Analyst',
        goal: context.goal || 'Job'
      };
    }

    // Default fallbacks if empty
    if (!userContext.currentEducation) userContext.currentEducation = 'B.Com';
    if (!userContext.targetJob) userContext.targetJob = 'Data Analyst';
    if (!userContext.skills) userContext.skills = [];

    // 3. Conversation Memory Management
    let convId = incomingConversationId || `conv-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    let conversation = null;

    if (incomingConversationId) {
      conversation = await Conversation.findOne({ conversationId: incomingConversationId });
      // Enforce ownership: If conversation has a userId and user is authenticated, check match
      if (conversation && conversation.userId && req.user && String(conversation.userId) !== String(req.user._id)) {
        // Different user cannot access someone else's conversation
        convId = `conv-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
        conversation = null;
      }
    }

    const conversationHistory = conversation?.messages || [];

    // 4. Generate RAG-Powered AI Response
    const structuredResponse = await AIService.chatResponse({
      message: message.trim(),
      userContext,
      careerTwin,
      conversationHistory
    });

    // 5. Persist Conversation in MongoDB
    const userMsg = {
      role: 'user',
      content: message.trim(),
      createdAt: new Date()
    };

    const assistantMsg = {
      role: 'assistant',
      content: structuredResponse.answer,
      structuredData: structuredResponse,
      createdAt: new Date()
    };

    if (conversation) {
      conversation.messages.push(userMsg, assistantMsg);
      conversation.lastActiveAt = new Date();
      if (!conversation.userId && req.user) {
        conversation.userId = req.user._id;
      }
      await conversation.save().catch(() => {});
    } else {
      await Conversation.create({
        conversationId: convId,
        userId: req.user?._id || null,
        title: message.trim().slice(0, 40),
        userContext: {
          currentEducation: userContext.currentEducation,
          targetJob: userContext.targetJob,
          skills: userContext.skills,
          goal: userContext.goal
        },
        messages: [userMsg, assistantMsg]
      }).catch(() => {});
    }

    // Persist conversation to Supabase
    const { SupabaseService } = await import('../services/supabase/supabaseService.js');
    await SupabaseService.saveConversation({
      conversationId: convId,
      userId: req.user?._id || req.user?.id,
      title: message.trim().slice(0, 40),
      userContext,
      messages: [userMsg, assistantMsg]
    }).catch(err => console.warn('[Supabase Chat Save]:', err.message));

    res.json({
      success: true,
      conversationId: convId,
      reply: structuredResponse.answer,
      data: structuredResponse
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get Conversation History for user or session
 */
export const getConversationHistory = async (req, res, next) => {
  try {
    const { conversationId } = req.params;

    // Check Supabase first
    const { SupabaseService } = await import('../services/supabase/supabaseService.js');
    const supabaseConv = await SupabaseService.getConversation(conversationId);
    if (supabaseConv) {
      return res.json({
        success: true,
        conversation: {
          conversationId: supabaseConv.conversation_id,
          title: supabaseConv.title,
          userContext: supabaseConv.user_context,
          messages: supabaseConv.messages || []
        }
      });
    }

    const conversation = await Conversation.findOne({ conversationId }).lean().catch(() => null);

    if (!conversation) {
      return res.status(404).json({ success: false, message: 'Conversation not found.' });
    }

    // Ownership check
    if (conversation.userId && req.user && String(conversation.userId) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Access denied to this conversation.' });
    }

    res.json({
      success: true,
      conversation
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Clear or Delete Conversation
 */
export const deleteConversation = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    await Conversation.deleteOne({
      conversationId,
      ...(req.user ? { userId: req.user._id } : {})
    });

    res.json({
      success: true,
      message: 'Conversation cleared successfully.'
    });
  } catch (error) {
    next(error);
  }
};
