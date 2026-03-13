function ForecastCard({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="text-gray-500 text-sm">{title}</h3>

      <p className="text-2xl font-bold text-primary">₹ {value}</p>
    </div>
  );
}

export default ForecastCard;
