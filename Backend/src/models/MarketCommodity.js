import mongoose from "mongoose";

const marketCommoditySchema = new mongoose.Schema(
  {
    marketName: {
      type: String,
      required: true,
      trim: true,
    },
    commodityName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

marketCommoditySchema.index(
  { marketName: 1, commodityName: 1 },
  { unique: true }
);

const MarketCommodity = mongoose.model("MarketCommodity", marketCommoditySchema);

export default MarketCommodity;