// src/server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

interface TokenPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
}

const SOLANA_TOKENS = [
  "solana",
  "bonk",
  "raydium",
  "serum",
  "samoyedcoin",
  "orca",
];

app.get("/api/token-prices", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.COINGECKO_API_URL}/coins/markets`,
      {
        params: {
          vs_currency: "usd",
          ids: SOLANA_TOKENS.join(","),
          order: "market_cap_desc",
          per_page: 100,
          page: 1,
          sparkline: false,
        },
      }
    );

    const tokenPrices: TokenPrice[] = response.data;
    res.json(tokenPrices);
  } catch (error) {
    console.error("Error fetching token prices:", error);
    res.status(500).json({ error: "Failed to fetch token prices" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
