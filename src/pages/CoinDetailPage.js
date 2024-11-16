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

const CoinDetailPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [timeframe, setTimeframe] = useState("7");

  useEffect(() => {
    const fetchCoinDetails = async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      setCoin(response.data);
    };

    const fetchPriceHistory = async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
        { params: { vs_currency: "usd", days: timeframe } }
      );
      setPriceHistory(response.data.prices);
    };

    fetchCoinDetails();
    fetchPriceHistory();
  }, [id, timeframe]);

  if (!coin) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Coin Info */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex items-center space-x-4">
          <img src={coin.image.large} alt={coin.name} className="w-16 h-16" />
          <div>
            <h1 className="text-2xl font-bold">{coin.name}</h1>
            <p className="text-gray-500">Rank #{coin.market_cap_rank}</p>
          </div>
        </div>
        <p className="mt-2">{coin.description.en.split(".")[0]}</p>
      </div>

      {/* Timeframe Selector */}
      <div className="mb-4">
        <select
          className="p-2 border rounded-md"
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
      <div className="bg-white p-4 rounded-lg shadow">
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
            />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}`} />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CoinDetailPage;
