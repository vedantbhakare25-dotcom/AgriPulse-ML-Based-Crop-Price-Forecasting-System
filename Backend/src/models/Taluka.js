import mongoose from "mongoose";

const talukaSchema = new mongoose.Schema(
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
    stateCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
  },
  { timestamps: true }
);

talukaSchema.index(
  { name: 1, districtName: 1, stateCode: 1 },
  { unique: true }
);

const Taluka = mongoose.model("Taluka", talukaSchema);

export default Taluka;