import { calculateStandardDeviation, calculateElasticity } from './statistics.js';
import { MOCK_DISTANCES } from './config.js';

/**
 * Transforms an array of flat MarketPriceDaily records into engineered features per market.
 */
export function engineerFeatures(prices, commodityName) {
  // Group by marketName
  const marketMap = {};
  
  prices.forEach(p => {
    if (!marketMap[p.marketName]) {
      marketMap[p.marketName] = [];
    }
    marketMap[p.marketName].push(p);
  });
  
  const features = [];
  
  for (const [marketName, records] of Object.entries(marketMap)) {
    // Sort descending by date
    records.sort((a, b) => new Date(b.priceDate) - new Date(a.priceDate));
    
    const recent30 = records.slice(0, 30);
    const recent7 = records.slice(0, 7);
    
    const prices30 = recent30.map(r => r.modalPrice);
    const prices7 = recent7.map(r => r.modalPrice);
    const arrivals30 = recent30.map(r => r.arrival);
    
    const volatility30d = Math.round(calculateStandardDeviation(prices30) * 100) / 100;
    const volatility7d = Math.round(calculateStandardDeviation(prices7) * 100) / 100;
    const volatilityRatio = volatility30d > 0 ? (volatility7d / volatility30d) : 1;
    
    const arrivalPriceElasticity = calculateElasticity(prices30, arrivals30);
    
    const latestPrice = records[0].modalPrice;
    const latestArrival = records[0].arrival;
    
    // Placeholder Demand Strength
    // Mocks TraderVolume / ArrivalVolume
    const mockHash = marketName.length % 5; 
    const demandMultiplier = 0.8 + (mockHash * 0.1); 
    const mockTraderVolume = latestArrival * demandMultiplier;
    const demandStrengthScore = latestArrival > 0 ? (mockTraderVolume / latestArrival) : 1; 
    
    // Distance Factor
    const distance = MOCK_DISTANCES[marketName] || 40 + mockHash * 10;
    
    // Seasonal Momentum (Mocked via comparison to 30d average since we lack full 1yr seed data currently)
    const overallAverage = prices30.reduce((sum, val) => sum + val, 0) / (prices30.length || 1);
    const yoyPriceChangePercent = overallAverage > 0 ? ((latestPrice - overallAverage) / overallAverage) * 100 : 0;
    const seasonalMomentum = yoyPriceChangePercent;
    
    features.push({
      marketName,
      commodityName,
      latestPrice,
      latestArrival,
      volatility7d,
      volatility30d,
      volatilityRatio: Math.round(volatilityRatio * 100) / 100,
      arrivalPriceElasticity: Math.round(arrivalPriceElasticity * 1000) / 1000,
      demandStrengthScore: Math.round(demandStrengthScore * 100) / 100,
      seasonalMomentum: Math.round(seasonalMomentum * 100) / 100,
      yoyPriceChangePercent: Math.round(yoyPriceChangePercent * 100) / 100,
      distance
    });
  }
  
  return features;
}
