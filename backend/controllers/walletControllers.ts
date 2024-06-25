// import type { Socket } from "bun";

import type { Socket } from "socket.io";

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
};
