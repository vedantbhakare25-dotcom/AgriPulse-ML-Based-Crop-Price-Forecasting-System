function InsightPanel() {

return (

<div className="bg-green-50 border border-green-100 rounded-2xl p-6">

  <div className="flex items-start gap-4">

    {/* AI Icon */}
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100">

      <svg
        className="w-5 h-5 text-green-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.75 3v2.25M14.25 3v2.25M4.5 8.25h15M6.75 21h10.5a2.25 2.25 0 002.25-2.25V8.25H4.5v10.5A2.25 2.25 0 006.75 21z"
        />
      </svg>

    </div>

    {/* Insight Content */}
    <div className="flex-1">

      <h3 className="text-lg font-semibold text-green-900">
        AI Market Insight
      </h3>

      <p className="text-green-800 mt-2 leading-relaxed">

        Prices are expected to rise over the next few days due to reduced
        arrivals in nearby mandis and steady market demand. Farmers may
        benefit from holding their stock for a short period before selling.

      </p>

      {/* bullet reasoning */}
      <ul className="mt-4 space-y-1 text-sm text-green-900">

        <li>• Arrivals dropped by ~18% in nearby markets</li>
        <li>• Demand remains stable in wholesale markets</li>
        <li>• Forecast models predict upward price movement</li>

      </ul>

    </div>

  </div>

</div>

)

}

export default InsightPanel