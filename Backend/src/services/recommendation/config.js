export const WEIGHTS = {
  profitability: 0.35,
  stability: 0.2,
  demand: 0.15,
  seasonality: 0.1,
  logistics: 0.2,
};

export const DEFAULT_MARKET_FEES_PERCENT = 1.5;

export const PERISHABILITY_CATEGORIES = {
  HIGH: ["Tomato", "Grapes", "Cabbage"],
  MEDIUM: ["Onion", "Potato", "Garlic"],
  LOW: ["Wheat", "Maize", "Cotton", "Soyabean", "Bajra"],
};

export const DISTANCE_PENALTY_MULTIPLIER = {
  HIGH: 1.5,
  MEDIUM: 1.0,
  LOW: 0.7,
};

// Mock distances (km) from a central district point
// In a real system, these would be calculated dynamically via Google Maps API etc.
export const MOCK_DISTANCES = {
  "Rahata": 25,
  "Shirdi": 30,
  "Kopargaon": 45,
  "Sangamner": 60,
  "Shrirampur": 35,
  "Pune": 150,
  "Nashik": 90,
  "Nagar": 70,
  "Ahmednagar": 70,
};

export function getPerishability(commodityName) {
  if (PERISHABILITY_CATEGORIES.HIGH.includes(commodityName)) return "HIGH";
  if (PERISHABILITY_CATEGORIES.MEDIUM.includes(commodityName)) return "MEDIUM";
  return "LOW";
}
