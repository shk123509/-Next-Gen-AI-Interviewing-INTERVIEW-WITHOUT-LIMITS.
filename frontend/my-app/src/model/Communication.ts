import mongoose, { Schema, models, model, Document } from "mongoose";

// -------- INTERFACE --------
export interface ICommunicationTest extends Document {
  userId: string;

  questions: {
    question: string;
    type: "text" | "audio"; // 👈 communication me dono ho sakta hai
  }[];

  responses: {
    answer: string;     // text answer ya transcript
    audioUrl?: string;  // optional (agar voice record ho)
  }[];

  score: number;
  status: "ongoing" | "completed";

  createdAt: Date;
  updatedAt: Date;
}

// -------- SCHEMA --------
const CommunicationTestSchema = new Schema<ICommunicationTest>(
  {
    userId: { type: String, required: true },

    questions: [
      {
        question: { type: String, required: true },
        type: {
          type: String,
          enum: ["text", "audio"],
          default: "text"
        }
      }
    ],

    responses: [
      {
        answer: { type: String, required: true },
        audioUrl: { type: String } // optional
      }
    ],

    score: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "ongoing"
    }
  },
  { timestamps: true }
);

// -------- MODEL --------
export const CommunicationTest =
  models.CommunicationTest ||
  model<ICommunicationTest>("CommunicationTest", CommunicationTestSchema);