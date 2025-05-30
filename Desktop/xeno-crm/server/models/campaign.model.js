import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rules: {
      type: Array,
      required: true,
    },
    operator: {
      type: String,
      enum: ["AND", "OR"],
      default: "AND",
    },
    audienceSize: {
      type: Number,
      default: 0,
    },
    stats: {
      sent: {
        type: Number,
        default: 0,
      },
      failed: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Campaign = mongoose.model("Campaign", campaignSchema);
export default Campaign;
