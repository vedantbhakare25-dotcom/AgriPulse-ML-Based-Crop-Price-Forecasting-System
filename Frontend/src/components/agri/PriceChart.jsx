import { useTranslation } from "react-i18next";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { formatNumber } from "../../utils/formatNumber";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function PriceChart({ dataPoints = [] }) {
  const { t, i18n } = useTranslation();

  const hasData = Array.isArray(dataPoints) && dataPoints.length > 0;

  const labels = hasData
    ? dataPoints.map((item) => item.priceDate)
    : t("price_chart.day_labels", { returnObjects: true });

  const values = hasData
    ? dataPoints.map((item) => item.modalPrice)
    : [0, 0, 0, 0, 0, 0, 0];

  const chartData = {
    labels,
    datasets: [
      {
        label: t("price_chart.predicted_price"),
        data: values,
        borderColor: "#2F855A",
        backgroundColor: "rgba(47,133,90,0.12)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = formatNumber(context.parsed.y, i18n.language);
            return `${t("price_chart.price_label")}: ₹${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `₹${formatNumber(value, i18n.language)}`;
          },
        },
      },
    },
  };

  return (
    <div className="h-80 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
}

export default PriceChart;