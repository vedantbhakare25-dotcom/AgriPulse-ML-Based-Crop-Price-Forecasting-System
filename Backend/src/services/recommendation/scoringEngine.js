import { 
  WEIGHTS, 
  DEFAULT_MARKET_FEES_PERCENT, 
  getPerishability, 
  DISTANCE_PENALTY_MULTIPLIER 
} from './config.js';

export function rankMarkets(features, quantity = 50, fuelCostPerKm = 12, marketFeePercent = DEFAULT_MARKET_FEES_PERCENT) {
  
  const scoredMarkets = features.map(market => {
    // 1. Logistics and Net Profit
    const perishability = getPerishability(market.commodityName);
    const distancePenalty = DISTANCE_PENALTY_MULTIPLIER[perishability];
    
    const grossRevenue = market.latestPrice * quantity;
    const transportCost = market.distance * fuelCostPerKm * distancePenalty;
    const marketFees = grossRevenue * (marketFeePercent / 100);
    const netProfit = grossRevenue - transportCost - marketFees;
    
    // Component score bounds (0 to 100) for weighting
    const stabilityScoreRaw = Math.max(0, 100 - (market.volatility7d / 10)); // Heuristic scaling
    const demandScoreRaw = Math.min(100, (market.demandStrengthScore / 1.5) * 100);
    const seasonalScoreRaw = Math.max(0, Math.min(100, 50 + (market.seasonalMomentum * 2))); 
    const proximityScoreRaw = Math.max(0, 100 - (market.distance)); // simple distance relative score
    
    return {
      ...market,
      perishabilityCategory: perishability,
      perishabilityWeight: distancePenalty,
      grossRevenue: Math.round(grossRevenue),
      transportCost: Math.round(transportCost),
      marketFees: Math.round(marketFees),
      netProfit: Math.round(netProfit),
      scores: {
        stabilityScoreRaw,
        demandScoreRaw,
        seasonalScoreRaw,
        proximityScoreRaw
      }
    };
  });
  
  // Normalize profitScore across the dataset
  const maxProfit = Math.max(...scoredMarkets.map(m => m.netProfit));
  
  scoredMarkets.forEach(market => {
    const profitScore = maxProfit > 0 ? (market.netProfit / maxProfit) * 100 : 0;
    
    const s = market.scores;
    const recommendationScore = 
      (WEIGHTS.profitability * profitScore) +
      (WEIGHTS.stability * s.stabilityScoreRaw) +
      (WEIGHTS.demand * s.demandScoreRaw) +
      (WEIGHTS.seasonality * s.seasonalScoreRaw) +
      (WEIGHTS.logistics * s.proximityScoreRaw);
      
    market.recommendationScore = Math.round(recommendationScore * 100) / 100;
    market.scores.profitScore = Math.round(profitScore);
  });
  
  // Sort descending by final score
  scoredMarkets.sort((a, b) => b.recommendationScore - a.recommendationScore);
  
  // Generate reasoning after sorting since we know ranks
  if (scoredMarkets.length > 0) {
    const bestMarket = scoredMarkets[0];
    scoredMarkets.forEach((market, index) => {
      market.reasoning = generateReasoning(market, index, bestMarket);
    });
  }
  
  return scoredMarkets;
}

function generateReasoning(market, rank, bestMarket) {
  const isBest = rank === 0;
  
  let reasoning = {
    summary: "",
    bullets: []
  };

  if (isBest) {
    reasoning.summary = `${market.marketName} is recommended because it offers the best balance of net profitability, stability, and logistics.`;
  } else {
    reasoning.summary = `${market.marketName} ranks #${rank + 1}. While a viable option, it is outranked by ${bestMarket.marketName}.`;
  }
  
  if (market.netProfit === bestMarket.netProfit && !isBest) {
    reasoning.bullets.push(`Similar profit to the best market, but higher volatility or distance drops its rank.`);
  } else if (!isBest) {
    reasoning.bullets.push(`Estimated net profit is ₹${market.netProfit}, which is lower than the best market (₹${bestMarket.netProfit}).`);
  } else {
    reasoning.bullets.push(`Highest overall estimated net profit (₹${market.netProfit}) after transport and fees.`);
  }

  if (market.volatility7d < 50) {
    reasoning.bullets.push(`Low recent price volatility (₹${market.volatility7d}) indicates a stable selling environment.`);
  } else {
    reasoning.bullets.push(`High recent price volatility (₹${market.volatility7d}) introduces price risk.`);
  }
  
  reasoning.bullets.push(`Perishability logistics penalty set to ${market.perishabilityWeight}x based on '${market.perishabilityCategory}' crop category.`);
  
  if (market.seasonalMomentum > 0) {
    reasoning.bullets.push(`Positive seasonal momentum (${market.yoyPriceChangePercent}%) compared to recent averages.`);
  }
  
  return reasoning;
}
