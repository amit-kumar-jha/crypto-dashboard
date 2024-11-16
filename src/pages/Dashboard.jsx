import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDarkMode } from "../lib/DarkModeProvider";

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const { isDarkMode } = useDarkMode();
  const [page, setPage] = useState(1); // Tracks the current page
  const [totalPages, setTotalPages] = useState(1); // Tracks total pages (if API supports)
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false); // Tracks if an error occurred

  const fetchCoins = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets`,
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 20, // Number of items per page
            page,
          },
        }
      );
      setCoins(response.data);
      setTotalPages(Math.ceil(100 / 20)); // Assuming API returns 100 results
    } catch (err) {
      console.error("Error fetching coins:", err);
      setError(true); // Set error state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [page]);

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  if (error) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="mb-4">Please try again after some time.</p>
        <button
          onClick={() => {
            setError(false);
            fetchCoins(); // Retry fetching data
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search for a cryptocurrency..."
          className={`w-full p-2 border rounded-md ${
            isDarkMode ? "bg-gray-800 text-white border-gray-700" : ""
          }`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Coin List */}
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCoins.map((coin) => (
            <Link
              to={`/coin/${coin.id}`}
              key={coin.id}
              className={`p-4 rounded-lg shadow ${
                isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white"
              }`}
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
      )}

      {/* Pagination Buttons */}
      <div className="flex  mt-4">
        <button
          onClick={handlePrevPage}
          className="px-4 mr-3 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
