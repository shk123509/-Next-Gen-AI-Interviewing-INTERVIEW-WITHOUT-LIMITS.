import mongoose, { Schema, models, model, Document } from "mongoose";

// -------- INTERFACE --------
export interface IAptitudeTest extends Document {
  userId: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
  score: number;
  status: "ongoing" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

// -------- SCHEMA --------
const AptitudeTestSchema = new Schema<IAptitudeTest>(
  {
    userId: { type: String, required: true },

    questions: [
      {
        question: { type: String, required: true },
        options: { type: [String], required: true },
        correctAnswer: { type: String, required: true },
      },
    ],

    score: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "ongoing",
    },
  },
  { timestamps: true }
);

// -------- MODEL --------
export const AptitudeTest =
  models.AptitudeTest ||
  model<IAptitudeTest>("AptitudeTest", AptitudeTestSchema);