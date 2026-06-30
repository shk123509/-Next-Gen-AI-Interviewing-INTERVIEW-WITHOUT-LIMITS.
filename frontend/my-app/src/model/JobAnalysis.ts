import mongoose from "mongoose";

const JobAnalysisSchema = new mongoose.Schema(
  {
    userId: String,

    jobDescription: String,

    resumeText: String,

    matchScore: Number,

    requiredSkills: [String],

    missingSkills: [String],

    strengths: [String],

    interviewQuestions: [String],

    improvementPlan: [String],
  },
  { timestamps: true }
);

export default mongoose.models.JobAnalysis ||
  mongoose.model("JobAnalysis", JobAnalysisSchema);