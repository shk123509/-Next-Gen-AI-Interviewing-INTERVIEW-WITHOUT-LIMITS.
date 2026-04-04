import mongoose, { Schema, Document, models, model } from "mongoose";

interface IQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface ICodingTest extends Document {
  userId: mongoose.Types.ObjectId;
  questions: IQuestion[];
  userAnswers: string[];
  score: number;
  startTime: Date;
  endTime?: Date;
  status: "ongoing" | "completed";
}

const CodingTestSchema = new Schema<ICodingTest>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: String,
      },
    ],

    userAnswers: {
      type: [String],
      default: [],
    },

    score: {
      type: Number,
      default: 0,
    },

    startTime: {
      type: Date,
      default: Date.now,
    },

    endTime: Date,

    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "ongoing",
    },
  },
  { timestamps: true }
);

export default models.CodingTest || model<ICodingTest>("CodingTest", CodingTestSchema);