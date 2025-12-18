"use client";

import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  const [code, setCode] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
    if (!code) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(`https://miniurl-2maq.onrender.com/api/stats/${code}`);
      if (!res.ok) {
        throw new Error("Invalid short code");
      }

      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const chartData = {
    labels: ["Clicks"],
    datasets: [
      {
        label: "Total Clicks",
        data: [data?.clicks || 0],
        backgroundColor: "#6366f1",
      },
    ],
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">

        <h1 className="text-3xl font-bold text-center">
          URL Analytics
        </h1>

        {/* Input */}
        <div className="flex gap-2">
          <input
            className="flex-1 px-3 py-2 rounded-md bg-black border border-white/20"
            placeholder="Enter short code (e.g. abc123)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            onClick={fetchAnalytics}
            className="px-4 py-2 bg-indigo-600 rounded-md"
          >
            {loading ? "..." : "View"}
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-center">{error}</p>
        )}

        {/* Result */}
        {data && (
          <div className="space-y-4">
            <p className="text-sm">
              <span className="text-gray-400">Original URL:</span><br />
              <a
                href={data.originalUrl}
                target="_blank"
                className="text-indigo-400 break-all"
              >
                {data.originalUrl}
              </a>
            </p>

            <div className="bg-black p-4 rounded-md">
              <Bar data={chartData} />
            </div>

            <p className="text-center text-lg">
              Total Clicks: <span className="font-bold">{data.clicks}</span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
