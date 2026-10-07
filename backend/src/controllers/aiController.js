import { AIService } from '../services/aiService.js';
import { CareerTwin } from '../models/CareerTwin.js';

export const chatWithAI = async (req, res, next) => {
  try {
    const { message, context } = req.body;
    let careerTwin = null;

    if (req.user) {
      careerTwin = await CareerTwin.findOne({ user: req.user._id });
    }

    const reply = await AIService.chatResponse({
      message,
      userContext: context,
      careerTwin
    });

    res.json({
      success: true,
      reply
    });
  } catch (error) {
    next(error);
  }
};
