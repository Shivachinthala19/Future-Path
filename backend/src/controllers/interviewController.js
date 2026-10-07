import { InterviewSession } from '../models/InterviewSession.js';
import { JobRole } from '../models/JobRole.js';
import { CareerTwin } from '../models/CareerTwin.js';

export const startInterview = async (req, res, next) => {
  try {
    const { targetRole, interviewType = 'Technical', difficulty = 'Junior / Fresher' } = req.body;
    const userId = req.user ? req.user._id : null;

    // Check if target role has custom interview topics
    const job = await JobRole.findOne({ title: { $regex: targetRole || 'Software', $options: 'i' } });

    let questions = [];
    if (job && job.interviewTopics && job.interviewTopics.length > 0) {
      questions = job.interviewTopics.slice(0, 4).map((topic, i) => ({
        question: `In the context of ${job.title}, please explain your practical understanding of ${topic} and how you apply it in a project scenario.`,
        category: interviewType,
        idealKeyPoints: ['Definition and core mechanism', 'Practical project trade-offs', 'Best practice implementation']
      }));
    } else {
      questions = [
        {
          question: `Walk me through a complex problem you tackled in your ${targetRole || 'recent studies'} and how you approached the solution from first principles.`,
          category: 'Behavioral / STAR',
          idealKeyPoints: ['Situation setup', 'Task definition', 'Action taken', 'Measurable result']
        },
        {
          question: `What are the primary performance and reliability trade-offs you consider when selecting tools for ${targetRole || 'this role'}?`,
          category: 'Technical Core',
          idealKeyPoints: ['Scalability', 'Maintainability', 'Error handling']
        },
        {
          question: `Tell me about a time you had to adapt quickly to an unfamiliar tool or changing requirement under deadline pressure.`,
          category: 'Adaptability',
          idealKeyPoints: ['Calm under pressure', 'Systematic resource lookup', 'Timely delivery']
        }
      ];
    }

    const session = new InterviewSession({
      user: userId,
      targetRole: job ? job.title : (targetRole || 'General Professional'),
      interviewType,
      difficulty,
      questions,
      overallScore: 0,
      isCompleted: false
    });

    if (userId) {
      await session.save();
    }

    res.status(201).json({
      success: true,
      data: session
    });
  } catch (error) {
    next(error);
  }
};

export const submitAnswer = async (req, res, next) => {
  try {
    const { sessionId, questionIndex, userAnswer } = req.body;
    const session = await InterviewSession.findById(sessionId);

    if (!session) {
      return res.status(404).json({ success: false, message: 'Interview session not found.' });
    }

    const q = session.questions[questionIndex];
    if (!q) {
      return res.status(400).json({ success: false, message: 'Invalid question index.' });
    }

    // Evaluate answer heuristics
    const words = (userAnswer || '').trim().split(/\s+/).length;
    let score = 50;
    let feedback = '';

    if (words > 40) score += 25;
    if (words > 80) score += 15;
    if (/for example|specifically|result|implemented|because|led to/i.test(userAnswer)) score += 10;
    score = Math.min(score, 98);

    if (score >= 80) {
      feedback = 'Outstanding answer! Clear articulation of rationale, practical evidence, and strong structural composure.';
    } else if (score >= 65) {
      feedback = 'Solid response. To elevate to top-percentile, emphasize measurable results and real-world edge cases.';
    } else {
      feedback = 'Good attempt. Provide more concrete examples and explain the "Why" behind your decision-making.';
    }

    q.userAnswer = userAnswer;
    q.score = score;
    q.aiFeedback = feedback;

    // Check if all answered
    const answeredCount = session.questions.filter(item => item.userAnswer && item.userAnswer.length > 0).length;
    if (answeredCount === session.questions.length) {
      session.isCompleted = true;
      const sumScores = session.questions.reduce((acc, curr) => acc + (curr.score || 0), 0);
      session.overallScore = Math.round(sumScores / session.questions.length);
      session.summaryFeedback = `Interview complete! Overall Readiness: ${session.overallScore}/100. Strongest domain clarity shown in structured problem solving.`;

      if (req.user) {
        await CareerTwin.updateOne(
          { user: req.user._id },
          {
            $set: { interviewReadinessScore: session.overallScore },
            $push: { recentActivity: { action: 'Completed Mock Interview', detail: `Scored ${session.overallScore}% in ${session.targetRole}` } }
          }
        );
      }
    }

    await session.save();

    res.json({
      success: true,
      data: {
        session,
        evaluatedQuestion: q
      }
    });
  } catch (error) {
    next(error);
  }
};
