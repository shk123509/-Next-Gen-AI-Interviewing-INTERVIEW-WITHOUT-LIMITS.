import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true
  },

  username: {
    type: String,
    required: true
  },

  email: String,

  title: {
    type: String,
    default: "Certificate of Completion"
  },

  course: {
    type: String,
    default: "AI Voice Interview Mastery"
  },

  description: {
    type: String,
    default:
      "This is to certify that the above named participant has successfully completed the AI Voice Interview program."
  },

  certificateId: {
    type: String,
    unique: true
  },

  issuedDate: {
    type: String
  },

  issuedTime: {
    type: String
  },

  background: {
    type: String,
    default: "/certificate-bg.png"
  }

});

export default mongoose.models.Certificate ||
mongoose.model("Certificate", certificateSchema);