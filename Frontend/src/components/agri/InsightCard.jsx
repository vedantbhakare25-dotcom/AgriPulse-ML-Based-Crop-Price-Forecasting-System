function InsightCards(){

return(

<div className="grid grid-cols-4 gap-6">

<div className="bg-white shadow rounded-xl p-5">
<h3 className="text-gray-500 text-sm">Best Market Price</h3>
<p className="text-2xl font-bold text-green-700">₹2100</p>
</div>

<div className="bg-white shadow rounded-xl p-5">
<h3 className="text-gray-500 text-sm">Average Price</h3>
<p className="text-2xl font-bold">₹1870</p>
</div>

<div className="bg-white shadow rounded-xl p-5">
<h3 className="text-gray-500 text-sm">Total Arrivals</h3>
<p className="text-2xl font-bold">1200 Tons</p>
</div>

<div className="bg-white shadow rounded-xl p-5">
<h3 className="text-gray-500 text-sm">7-Day Forecast</h3>
<p className="text-2xl font-bold text-orange-500">₹1950</p>
</div>

</div>

)

}

export default InsightCards