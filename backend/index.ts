import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import { walletControllers } from "./controllers/walletControllers";

const app = express();
const server = createServer(app);
const io = new Server(server);
interface TokenPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
}

export const SOLANA_TOKENS = [
  "solana",
  "bonk",
  "raydium",
  "serum",
  "samoyedcoin",
  "orca",
];

app.get("/", (req, res) => {
  res.json({ msg: "hi user" });
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("walletconnected", (data) => {
    console.log(data, "wallet connected");
  });

  socket.on("joinTokenRoom", ({ tokens }) => {
    console.log("joining room", tokens);
    socket.join(tokens);
    walletControllers.emitTokenProces({ socket, tokens });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
