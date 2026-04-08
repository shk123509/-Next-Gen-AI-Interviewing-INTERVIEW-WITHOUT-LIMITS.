import mongoose from "mongoose";

const ApiKeySchema = new mongoose.Schema({
  geminiApiKey: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.ApiKey || mongoose.model("ApiKey", ApiKeySchema);