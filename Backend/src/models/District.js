import mongoose from "mongoose";

const districtSchema = new mongoose.Schema(
  {
    name: {
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

districtSchema.index({ name: 1, stateCode: 1 }, { unique: true });

const District = mongoose.model("District", districtSchema);

export default District;