import Navbar from "../components/layout/Navbar"

import CropSelector from "../components/agri/CropSelector"
import ForecastCard from "../components/agri/ForecastCard"
import MandiTable from "../components/agri/MandiTable"
import PriceChart from "../components/agri/PriceChart"
import InsightPanel from "../components/agri/InsightPanel"

function MarketDashboard(){

  const staticMarketData = [
    { mandi: "Lasalgaon", price: 2100, arrival: 520, distance: 18 },
    { mandi: "Pimpalgaon", price: 2050, arrival: 430, distance: 24 },
    { mandi: "Nashik City", price: 1980, arrival: 300, distance: 12 }
  ];

return(

<div className="bg-gray-50 min-h-screen">

  <Navbar />

  <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

      {/* Crop selection */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <CropSelector />
      </div>

      {/* Market Summary */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Market Summary</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ForecastCard title="Best Market Price" value="2100" />
          <ForecastCard title="Average Price" value="1870" />
          <ForecastCard title="7 Day Forecast" value="1950" />
        </div>
      </div>

      {/* Nearby Market Prices */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Nearby Market Prices</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <MandiTable data={staticMarketData} />
        </div>
      </div>

      {/* Price Trend */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Price Trend</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <PriceChart />
        </div>
      </div>

      {/* AI Insights */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">AI Insights</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <InsightPanel />
        </div>
      </div>

    </div>

</div>

)

}

export default MarketDashboard