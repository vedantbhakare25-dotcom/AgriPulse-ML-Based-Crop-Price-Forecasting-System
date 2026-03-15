import mongoose from "mongoose";

const marketPriceDailySchema = new mongoose.Schema(
  {
    stateCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
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
    variety: {
      type: String,
      default: "",
      trim: true,
    },
    unit: {
      type: String,
      default: "Quintal",
      trim: true,
    },
    arrival: {
      type: Number,
      default: 0,
    },
    minPrice: {
      type: Number,
      default: 0,
    },
    modalPrice: {
      type: Number,
      default: 0,
    },
    maxPrice: {
      type: Number,
      default: 0,
    },
    priceDate: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

marketPriceDailySchema.index({
  marketName: 1,
  commodityName: 1,
  priceDate: 1,
});

const MarketPriceDaily = mongoose.model(
  "MarketPriceDaily",
  marketPriceDailySchema
);

export default MarketPriceDaily;