import mongoose from "mongoose";

const customeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    totalSpent: {
      type: Number,
      default: 0,
    },
    visits: {
      type: Number,
      default: 0,
    },
    lastActive: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Customer = mongoose.model("Customer", customeSchema);
export default Customer;
