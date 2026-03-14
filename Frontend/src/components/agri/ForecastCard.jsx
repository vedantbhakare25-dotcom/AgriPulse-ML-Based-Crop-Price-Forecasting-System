function ForecastCard({ title, value }) {

return (

<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition duration-200">

  <div className="flex items-center justify-between">

    <div>

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="text-3xl font-bold text-gray-900 mt-1">
        {value}
      </h3>

    </div>

    {/* decorative icon circle */}
    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">

      <svg
        className="w-6 h-6 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8c-1.5 0-3 1.2-3 3s1.5 3 3 3 3-1.2 3-3-1.5-3-3-3zm0-6v2m0 16v2m8-10h2M2 12H4m13.66-6.34l1.41 1.41M4.93 19.07l1.41-1.41m0-11.32L4.93 4.93m14.14 14.14l-1.41-1.41"
        />
      </svg>

    </div>

  </div>

</div>

)

}

export default ForecastCard