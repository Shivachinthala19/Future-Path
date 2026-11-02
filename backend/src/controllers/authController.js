import { SupabaseService } from '../services/supabase/supabaseService.js';
import { generateToken } from '../utils/tokenHelper.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, currentEducation, targetCareer } = req.body;

    const existingUser = await SupabaseService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email address already exists.',
      });
    }

    const user = await SupabaseService.createUser({
      name,
      email,
      password,
      currentEducation: {
        name: currentEducation || '',
        status: 'completed',
      },
      targetCareer: targetCareer || ''
    });

    const token = generateToken(user._id || user.id);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        currentEducation: user.currentEducation,
        careerGoal: user.careerGoal,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await SupabaseService.findUserByEmail(email);
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = generateToken(user._id || user.id);

    res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: user._id || user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        currentEducation: user.currentEducation,
        careerGoal: user.careerGoal,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const userId = req.user._id || req.user.id;
    const user = await SupabaseService.findUserById(userId);

    res.json({
      success: true,
      user,
      careerTwin: {
        education: { degreeName: user?.currentEducation?.name || '' },
        targetCareers: user?.careerGoal?.targetCareer ? [user.careerGoal.targetCareer] : [],
        passportSlug: `${user?.name?.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'user'}-${String(userId).slice(-4)}`,
        recentActivity: [{ action: 'Active Session', detail: 'Logged in to Future Path' }]
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, headline, location, currentEducation, careerGoal, preferences } = req.body;
    const userId = req.user._id || req.user.id;

    const updated = await SupabaseService.updateUserProfile(userId, {
      name,
      headline,
      location,
      currentEducation,
      careerGoal,
      preferences
    });

    const user = await SupabaseService.findUserById(userId);

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      user,
    });
  } catch (error) {
    next(error);
  }
};
