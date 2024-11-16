import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  const fetchCoins = async () => {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets`,
      { params: { vs_currency: "usd", order: "market_cap_desc", per_page: 20 } }
    );
    setCoins(response.data);
  };

  React.useEffect(() => {
    fetchCoins();
  }, []);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a cryptocurrency..."
          className="w-full p-2 border rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Coin List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCoins.map((coin) => (
          <Link
            to={`/coin/${coin.id}`}
            key={coin.id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <img src={coin.image} alt={coin.name} className="w-10 h-10" />
              <div>
                <h2 className="font-bold">{coin.name}</h2>
                <p className="text-sm text-gray-500">
                  {coin.symbol.toUpperCase()}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-lg font-bold">${coin.current_price}</p>
              <p
                className={`text-sm ${
                  coin.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
