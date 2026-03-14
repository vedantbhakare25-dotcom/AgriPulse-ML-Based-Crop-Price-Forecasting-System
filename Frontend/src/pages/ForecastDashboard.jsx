import Navbar from "../components/layout/Navbar";
import CropSelector from "../components/agri/CropSelector";
import ForecastCard from "../components/agri/ForecastCard";
import PriceChart from "../components/agri/PriceChart";
import InsightPanel from "../components/agri/InsightPanel";

function ForecastDashboard() {

return (

<div className="bg-gray-50 min-h-screen">

  <Navbar />

  <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

    {/* Page Header */}
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Price Forecast
      </h1>
      <p className="text-gray-500 mt-2">
        Predict future mandi prices for the selected crop
      </p>
    </div>

    {/* Crop Selector */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <CropSelector />
    </div>

    {/* Forecast Summary */}
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Forecast Summary
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ForecastCard title="Tomorrow Price" value="2120" />
        <ForecastCard title="7 Day Average" value="2080" />
        <ForecastCard title="Trend" value="Upward" />
        <ForecastCard title="Confidence" value="82%" />
      </div>
    </div>

    {/* Forecast Chart */}
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        7-Day Forecast Trend
      </h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <PriceChart />
      </div>
    </div>

    {/* AI Insight */}
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        AI Forecast Insight
      </h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <InsightPanel />
      </div>
    </div>

    {/* Recommendation */}
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Recommendation
      </h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <h3 className="text-lg font-semibold text-gray-900">
          Suggested Action
        </h3>

        <p className="text-gray-600 mt-2">
          Current trend is upward. Waiting 2–3 days may improve the selling price.
        </p>

      </div>
    </div>

  </div>

</div>

);

}

export default ForecastDashboard;