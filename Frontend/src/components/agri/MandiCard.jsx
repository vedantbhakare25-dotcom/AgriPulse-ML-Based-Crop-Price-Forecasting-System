function MandiCard({ mandi, price, distance }) {
  return (
    <div className="flex justify-between bg-white p-4 rounded-xl shadow">
      <div>
        <h3 className="font-semibold">{mandi}</h3>

        <p className="text-gray-500 text-sm">{distance} km away</p>
      </div>

      <p className="text-primary font-bold">₹ {price}</p>
    </div>
  );
}

export default MandiCard;
