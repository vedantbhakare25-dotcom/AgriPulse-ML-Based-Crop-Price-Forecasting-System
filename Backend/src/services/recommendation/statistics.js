/**
 * Calculate standard deviation of an array of numbers
 */
export function calculateStandardDeviation(values) {
  if (!values || values.length <= 1) return 0;
  
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (values.length - 1);
  return Math.sqrt(variance);
}

/**
 * Calculate basic elasticity (how price responds to arrival changes)
 * Uses simple linear regression slope: covariance(A, P) / variance(A)
 */
export function calculateElasticity(prices, arrivals) {
  if (!prices || !arrivals || prices.length < 2 || prices.length !== arrivals.length) return 0;
  
  const n = prices.length;
  let sumP = 0, sumA = 0;
  
  for (let i = 0; i < n; i++) {
    sumP += prices[i];
    sumA += arrivals[i];
  }
  
  const meanA = sumA / n;
  const meanP = sumP / n;
  
  let covariance = 0;
  let varianceA = 0;
  
  for (let i = 0; i < n; i++) {
    covariance += (arrivals[i] - meanA) * (prices[i] - meanP);
    varianceA += Math.pow(arrivals[i] - meanA, 2);
  }
  
  if (varianceA === 0) return 0;
  return covariance / varianceA;
}

/**
 * Get moving average for the last N days
 */
export function calculateMovingAverage(values, days) {
  if (!values || values.length === 0) return 0;
  const recentValues = values.slice(0, days);
  return recentValues.reduce((sum, val) => sum + val, 0) / recentValues.length;
}
