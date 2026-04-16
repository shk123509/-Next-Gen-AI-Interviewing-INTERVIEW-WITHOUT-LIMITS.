import mongoose, { Schema, models, model, Document } from "mongoose";

// -------- INTERFACE --------
export interface ICommunicationTest extends Document {
  userId: string;

  questions: {
    question: string;
  }[];

  userAnswers: string[];

  score: number;
  status: "ongoing" | "completed";
  passed: boolean;

  createdAt: Date;
  updatedAt: Date;
}

// -------- SCHEMA --------
const CommunicationTestSchema = new Schema<ICommunicationTest>(
  {
    userId: { type: String, required: true },

    questions: [
      {
        question: { type: String, required: true }
      }
    ],

    userAnswers: {
      type: [String],
      default: []
    },

    score: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "ongoing"
    },

    passed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// -------- MODEL --------
export const CommunicationTest =
  models.CommunicationTest ||
  model<ICommunicationTest>("CommunicationTest", CommunicationTestSchema);