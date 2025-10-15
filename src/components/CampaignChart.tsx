import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useCampaignStore } from "../store/useCampaignStore";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export const CampaignChart = React.memo(() => {
  const { filtered } = useCampaignStore();

  const data = {
    labels: filtered.map((c) => c.name),
    datasets: [
      {
        label: "CTR (%)",
        data: filtered.map((c) => c.ctr),
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.1)",
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.3,
      },
      {
        label: "Conversions",
        data: filtered.map((c) => c.conversions),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.1)",
        borderWidth: 2,
        pointRadius: 3,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: { color: "#374151", font: { size: 12 } },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#111",
        bodyColor: "#333",
        borderColor: "#e5e7eb",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: "#6b7280", font: { size: 10 } },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#6b7280", font: { size: 10 } },
        grid: { color: "#f3f4f6" },
      },
    },
  };

  return (
    <div className="bg-white p-4 md:p-6 mt-4 rounded-lg shadow-md w-full">
      <div className="w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[350px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
});
