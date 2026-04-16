import mongoose, { Schema, models, model, Document } from "mongoose";

// -------- INTERFACE --------
export interface IAptitudeTest extends Document {
  userId: string;

  questions: {
    question: string;
    options: string[];
    correctAnswer: "A" | "B" | "C" | "D";
  }[];

  userAnswers: string[];
  score: number;
  status: "ongoing" | "completed";
  passed: boolean;

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
        options: {
          type: [String],
          required: true,
          validate: {
            validator: (arr: string[]) => arr.length === 4,
            message: "Exactly 4 options required"
          }
        },
        correctAnswer: {
          type: String,
          enum: ["A", "B", "C", "D"],
          required: true
        }
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
export const AptitudeTest =
  models.AptitudeTest ||
  model<IAptitudeTest>("AptitudeTest", AptitudeTestSchema);