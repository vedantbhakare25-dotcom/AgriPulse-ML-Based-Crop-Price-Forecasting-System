import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PriceChart() {
  const data = {
    labels: ["Day1", "Day2", "Day3", "Day4", "Day5"],
    datasets: [
      {
        label: "Price",
        data: [1700, 1750, 1800, 1850, 1900],
        borderColor: "#2F855A",
        backgroundColor: "rgba(47, 133, 90, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Price Trend</h2>
      <Line data={data} />
    </div>
  );
}

export default PriceChart;