import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/layout/Navbar";
import CropSelector from "../components/agri/CropSelector";
import ForecastCard from "../components/agri/ForecastCard";
import InsightPanel from "../components/agri/InsightPanel";
import { fetchRecommendation } from "../services/api";

function ForecastDashboard() {
  const { t } = useTranslation();

  const [selection, setSelection] = useState({
    districtName: "",
    commodityName: "",
  });

  const [recommendationData, setRecommendationData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRecommendation = async () => {
      if (!selection.districtName || !selection.commodityName) {
        setRecommendationData(null);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchRecommendation({
          districtName: selection.districtName,
          commodityName: selection.commodityName,
        });
        setRecommendationData(data);
      } catch (error) {
        console.error("Failed to fetch recommendation:", error);
        setRecommendationData(null);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendation();
  }, [selection.districtName, selection.commodityName]);

  const bestMarket = recommendationData?.recommendedMarket;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Market Recommendation Engine
          </h1>
          <p className="text-gray-500 mt-2">
            AI-driven net profitability and risk analysis.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <CropSelector onSelectionChange={setSelection} />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 bg-green-200 rounded-full mb-4"></div>
              <p className="text-gray-500 font-medium">Analyzing market data & logistics...</p>
            </div>
          </div>
        ) : bestMarket ? (
          <>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Recommendation Summary
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <ForecastCard
                  title="Best Market"
                  value={bestMarket.marketName}
                />
                <ForecastCard
                  title="Net Profit (Est)"
                  value={`₹${bestMarket.netProfit}`}
                />
                <ForecastCard
                  title="Price Volatility (7d)"
                  value={bestMarket.volatility7d}
                />
                <ForecastCard
                  title="AI Score"
                  value={`${bestMarket.recommendationScore} / 100`}
                />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                AI Reasoning & Insights
              </h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <InsightPanel recommendation={bestMarket} />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                All Ranked Markets
              </h2>
              
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rank</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Market</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Modal Price</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Est. Net Profit</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Score</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {recommendationData.ranking.map((m, idx) => (
                        <tr key={m.marketName} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">#{idx + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${idx === 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                {m.marketName.charAt(0)}
                              </div>
                              <span className="text-sm font-semibold text-gray-900">{m.marketName}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{m.latestPrice}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">₹{m.netProfit}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${idx === 0 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                              {m.recommendationScore}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No data selected</h3>
            <p className="mt-1 text-sm text-gray-500">Please select a district and crop from the selectors above to view AI recommendations.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForecastDashboard;