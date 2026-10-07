import { User } from '../models/User.js';
import { CareerTwin } from '../models/CareerTwin.js';
import { generateToken } from '../utils/tokenHelper.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password, currentEducation, targetCareer } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email address already exists.',
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      currentEducation: {
        name: currentEducation || '',
        status: 'completed',
      },
      careerGoal: {
        targetCareer: targetCareer || '',
      },
    });

    // Create initial CareerTwin for user
    await CareerTwin.create({
      user: user._id,
      education: {
        degreeName: currentEducation || '',
        status: 'completed',
      },
      targetCareers: targetCareer ? [targetCareer] : [],
      passportSlug: `${user.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${user._id.toString().slice(-4)}`,
      recentActivity: [
        { action: 'Account Created', detail: 'Welcome to Future Path!' }
      ]
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: {
        id: user._id,
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

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
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
    const user = await User.findById(req.user._id);
    const careerTwin = await CareerTwin.findOne({ user: req.user._id });

    res.json({
      success: true,
      user,
      careerTwin,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, headline, location, currentEducation, careerGoal, preferences } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (headline) user.headline = headline;
    if (location) user.location = { ...user.location, ...location };
    if (currentEducation) user.currentEducation = { ...user.currentEducation, ...currentEducation };
    if (careerGoal) user.careerGoal = { ...user.careerGoal, ...careerGoal };
    if (preferences) user.preferences = { ...user.preferences, ...preferences };

    await user.save();

    // Sync to CareerTwin
    if (currentEducation?.name) {
      await CareerTwin.updateOne(
        { user: user._id },
        { 
          $set: { 'education.degreeName': currentEducation.name },
          $push: { recentActivity: { action: 'Updated Education', detail: currentEducation.name } }
        }
      );
    }

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      user,
    });
  } catch (error) {
    next(error);
  }
};
