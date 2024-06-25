// import type { Socket } from "bun";

import type { Server, Socket } from "socket.io";
import axios from "axios";
import { tokenDataStore } from "..";
export const walletControllers = {
  emitTokenProces: async ({
    socket,
    tokens,
  }: {
    socket: Socket;
    tokens: [];
  }) => {
    console.log("emitting token price");
    tokens.forEach((token) => {
      socket.to(token).emit("tokenPrice", { msg: "hello", token });
    });
  },
  fetchTokenDetails: async (
    token: string
  ): Promise<{ mintAddress: string; symbol: string; price: number }> => {
    //there is work to be done here
    const response = await axios.get(
      `https://api.example.com/tokenDetails/${token}`
    );
    const { mintAddress, symbol, price } = response.data;
    return { mintAddress, symbol, price };
  },
  performSentimentAnalysis: (token: string): string => {
    //theres is work to be done here
    const sentiments = ["Positive", "Neutral", "Negative"];
    return sentiments[Math.floor(Math.random() * sentiments.length)];
  },
  updateTokenData: async (tokens: string[], io: Server) => {
    for (const token of tokens) {
      const { mintAddress, symbol, price } =
        await walletControllers.fetchTokenDetails(token);
      const sentiment = walletControllers.performSentimentAnalysis(token);
      tokenDataStore[token] = { mintAddress, symbol, price, sentiment };

      // Emit updated data to the corresponding room
      io.to(token).emit("tokenPrice", {
        token,
        mintAddress,
        symbol,
        price,
        sentiment,
      });
    }
  },
};
