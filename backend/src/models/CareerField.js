import mongoose from 'mongoose';

const careerFieldSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: { type: String, default: '' },
    icon: { type: String, default: 'Briefcase' },
    growthOutlook: { type: String, default: 'High Growth (+14% annually)' },
    highDemandScore: { type: Number, default: 85, min: 0, max: 100 },
    globalMarketSize: { type: String, default: '$200B+' },
    topIndustries: [{ type: String }],
  },
  { timestamps: true }
);

export const CareerField = mongoose.model('CareerField', careerFieldSchema);
