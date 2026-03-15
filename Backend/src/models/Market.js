import mongoose from "mongoose";

const marketSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    districtName: {
      type: String,
      required: true,
      trim: true,
    },
    talukaName: {
      type: String,
      required: true,
      trim: true,
    },
    stateCode: {
      type: String,
      required: true,
      trim: true,
    },
    marketType: {
      type: String,
      default: "APMC",
    },
  },
  { timestamps: true },
);

const Market = mongoose.model("Market", marketSchema);

export default Market;
