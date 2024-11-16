import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDarkMode } from "../lib/DarkModeProvider";

const CoinDetailPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [timeframe, setTimeframe] = useState("7");
  const [hasError, setHasError] = useState(false);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setCoin(response.data);
      } catch (error) {
        console.error("Error fetching coin details:", error);
        setHasError(true);
      }
    };

    const fetchPriceHistory = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
          { params: { vs_currency: "usd", days: timeframe } }
        );
        setPriceHistory(response.data.prices);
      } catch (error) {
        console.error("Error fetching price history:", error);
        setHasError(true);
      }
    };

    setHasError(false); // Reset error state before fetching
    fetchCoinDetails();
    fetchPriceHistory();
  }, [id, timeframe]);

  // If an error occurred, show the fallback page
  if (hasError) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div
          className={`p-8 rounded-lg shadow transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h1 className="text-2xl font-bold mb-4">Something went wrong 😔</h1>
          <p className="mb-4">Please try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  if (!coin) return <p>Loading...</p>;

  return (
    <div
      className={`min-h-screen p-4 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Coin Info */}
      <div
        className={`p-4 rounded-lg shadow mb-4 transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <div className="flex items-center space-x-4">
          <img src={coin.image.large} alt={coin.name} className="w-16 h-16" />
          <div>
            <h1 className="text-2xl font-bold">{coin.name}</h1>
            <p className="text-gray-500">Rank #{coin.market_cap_rank}</p>
          </div>
        </div>
        <p className="mt-2">
          {coin.description.en
            ? coin.description.en.split(".")[0]
            : "No description available."}
        </p>
      </div>

      {/* Timeframe Selector */}
      <div className="mb-4">
        <select
          className={`p-2 border rounded-md transition-colors duration-300 ${
            isDarkMode
              ? "bg-gray-800 text-gray-100 border-gray-600"
              : "bg-gray-100 text-gray-900 border-gray-300"
          }`}
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
        >
          <option value="1">1 Day</option>
          <option value="7">7 Days</option>
          <option value="30">1 Month</option>
          <option value="90">3 Months</option>
          <option value="365">1 Year</option>
        </select>
      </div>

      {/* Chart */}
      <div
        className={`p-4 rounded-lg shadow transition-colors duration-300 ${
          isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={priceHistory.map(([timestamp, price]) => ({
              timestamp,
              price,
            }))}
          >
            <XAxis
              dataKey="timestamp"
              tickFormatter={(timestamp) =>
                new Date(timestamp).toLocaleDateString()
              }
              tick={{
                fill: isDarkMode ? "#ffffff" : "#000000",
              }}
            />
            <YAxis
              tick={{
                fill: isDarkMode ? "#ffffff" : "#000000",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? "#333333" : "#ffffff",
                color: isDarkMode ? "#ffffff" : "#000000",
              }}
              formatter={(value) => `$${value}`}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={isDarkMode ? "#38bdf8" : "#8884d8"}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CoinDetailPage;
