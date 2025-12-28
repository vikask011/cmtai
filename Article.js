import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  originalUrl: String,
  publishedAt: Date,
  isUpdated: Boolean,
  references: [String]
}, { timestamps: true });

export default mongoose.model("Article", articleSchema);
