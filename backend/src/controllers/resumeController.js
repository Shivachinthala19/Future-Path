import { Resume } from '../models/Resume.js';
import { CareerTwin } from '../models/CareerTwin.js';
import { Skill } from '../models/Skill.js';
import { JobRole } from '../models/JobRole.js';

export const analyzeResume = async (req, res, next) => {
  try {
    const { resumeText, targetJob } = req.body;
    const userId = req.user ? req.user._id : null;

    if (!resumeText || resumeText.length < 20) {
      return res.status(400).json({
        success: false,
        message: 'Please paste sufficient resume text for ATS and competency analysis.'
      });
    }

    // 1. Scan for known skills in DB
    const allSkills = await Skill.find().lean();
    const detectedSkills = [];
    const lowerText = resumeText.toLowerCase();

    allSkills.forEach(skill => {
      if (lowerText.includes(skill.name.toLowerCase())) {
        detectedSkills.push(skill.name);
      }
    });

    // 2. Target job matching
    let missingSkills = [];
    let targetJobTitle = targetJob || 'General Professional Track';

    if (targetJob) {
      const job = await JobRole.findOne({
        title: { $regex: targetJob, $options: 'i' }
      }).populate('requiredSkills');

      if (job && job.requiredSkills) {
        targetJobTitle = job.title;
        job.requiredSkills.forEach(rs => {
          if (!detectedSkills.some(ds => ds.toLowerCase() === rs.name.toLowerCase())) {
            missingSkills.push(rs.name);
          }
        });
      }
    }

    if (missingSkills.length === 0) {
      missingSkills = ['Data-Driven Metrics & Impact Proof', 'Domain Automation Tools', 'Cross-Functional Leadership'];
    }

    // 3. Compute ATS Metrics
    const wordCount = resumeText.split(/\s+/).length;
    const hasQuantifiableMetrics = /\d+([%kKmMbB]|\+)/g.test(resumeText);
    const hasEducationSection = /education|degree|bachelor|master|diploma|school/i.test(resumeText);
    const hasProjectsSection = /project|portfolio|capstone|github|deliverable/i.test(resumeText);

    let atsScore = 65;
    if (detectedSkills.length >= 4) atsScore += 10;
    if (hasQuantifiableMetrics) atsScore += 10;
    if (hasEducationSection) atsScore += 5;
    if (hasProjectsSection) atsScore += 5;
    atsScore = Math.min(atsScore, 95);

    const strengths = [
      `Detected ${detectedSkills.length} verified technical/domain competencies.`,
      hasQuantifiableMetrics ? 'Includes quantifiable metric indicators of achievement.' : 'Clear structured chronology.',
      hasProjectsSection ? 'Highlights practical projects and hands-on deliverables.' : 'Identifiable educational credentials.'
    ];

    const improvements = [
      `Incorporate missing target competencies: ${missingSkills.slice(0, 3).join(', ')}.`,
      'Use the Google X-Y-Z formula: "Accomplished [X] as measured by [Y], by doing [Z]".',
      'Ensure standard section headers (Summary, Core Competencies, Experience, Projects, Education) for automated ATS parsers.'
    ];

    const resumeRecord = new Resume({
      user: userId,
      rawText: resumeText.slice(0, 5000),
      targetJobTitle,
      detectedSkills,
      missingSkills,
      recommendedKeywords: [...missingSkills.slice(0, 4), 'Agile', 'Cross-Functional Collaboration', 'System Optimization'],
      strengths,
      improvements,
      overallScore: atsScore,
      atsBreakdown: {
        formattingScore: 85,
        skillsMatchScore: Math.min(detectedSkills.length * 15, 95),
        experienceClarityScore: hasQuantifiableMetrics ? 85 : 65,
        keywordDensityScore: Math.round(atsScore * 0.9)
      }
    });

    if (userId) {
      await resumeRecord.save();
      await CareerTwin.updateOne(
        { user: userId },
        {
          $set: { resumeScore: atsScore },
          $push: { recentActivity: { action: 'Resume Analyzed', detail: `Scored ${atsScore}/100 ATS readiness` } }
        }
      );
    }

    res.json({
      success: true,
      data: resumeRecord
    });
  } catch (error) {
    next(error);
  }
};
