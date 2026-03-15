import mongoose from "mongoose";

const commoditySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Commodity = mongoose.model("Commodity", commoditySchema);

export default Commodity;