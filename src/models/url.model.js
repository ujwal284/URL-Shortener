import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    unique: true
  },
  clicks: {
    type: Number,
    default: 0
  },
}, { timestamps: true });

export const Url = mongoose.model("Url", urlSchema);