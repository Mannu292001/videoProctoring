import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  type: { type: String, required: true, default: "info" }, // ✅ default fallback
  details: { type: Object, default: {} },                  // ✅ avoid undefined
  timestamp: { type: Date, default: Date.now },
});

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  interviewId: { type: String, required: true }, // link logs to an interview session
  logs: [logSchema],
});

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;
