import Navbar from "../components/layout/Navbar"

import CropSelector from "../components/agri/CropSelector"
import ForecastCard from "../components/agri/ForecastCard"
import MandiTable from "../components/agri/MandiTable"
import PriceChart from "../components/agri/PriceChart"
import InsightPanel from "../components/agri/InsightPanel"

function MarketDashboard(){

return(

<div className="bg-gray-100 min-h-screen">

  <Navbar />

  <div className="max-w-7xl mx-auto p-8 space-y-8">

      {/* Crop selection */}
      <CropSelector />

      {/* Market Summary */}
      <h3 className="text-lg font-semibold text-gray-700">Market Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <ForecastCard title="Best Market Price" value="2100" />
        <ForecastCard title="Average Price" value="1870" />
        <ForecastCard title="7 Day Forecast" value="1950" />
      </div>

      {/* Nearby Market Prices */}
      <h3 className="text-lg font-semibold text-gray-700">Nearby Market Prices</h3>
      <MandiTable
        data={[
          { mandi: "Lasalgaon", price: 2100, arrival: 520, distance: 18 },
          { mandi: "Pune", price: 1980, arrival: 300, distance: 65 },
          { mandi: "Ahmednagar", price: 2050, arrival: 410, distance: 72 },
        ]}
      />

      {/* Price Trend */}
      <h3 className="text-lg font-semibold text-gray-700">Price Trend</h3>
      <PriceChart />

      {/* AI Insights */}
      <h3 className="text-lg font-semibold text-gray-700">AI Insights</h3>
      <InsightPanel />

    </div>

</div>

)

}

export default MarketDashboard