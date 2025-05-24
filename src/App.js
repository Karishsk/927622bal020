import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [stocks, setStocks] = useState({});
  const [priceData, setPriceData] = useState(null);

  // Fetch all stocks
  useEffect(() => {
    axios.get("http://20.244.56.144/evaluation-service/stocks")
      .then((res) => {
        setStocks(res.data.stocks || {});
      })
      .catch((err) => console.error("Error fetching stocks:", err));
  }, []);

  // Fetch specific stock price (e.g., NVDA for last 50 minutes)
  const fetchStockPrice = () => {
    axios.get("http://20.244.56.144/evaluation-service/stocks/NVDA?minutes=50")
      .then((res) => {
        setPriceData(res.data);
      })
      .catch((err) => console.error("Error fetching stock price:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📈 Stock Listings</h1>
      <ul>
        {Object.entries(stocks).map(([name, ticker]) => (
          <li key={ticker}>{name}: {ticker}</li>
        ))}
      </ul>

      <button onClick={fetchStockPrice}>Get NVDA Price (Last 50 mins)</button>

      {priceData && (
        <div style={{ marginTop: "20px" }}>
          <h2>NVDA Price</h2>
          <p>Price: ${priceData.price}</p>
          <p>Last Updated: {new Date(priceData.lastUpdatedAt).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
