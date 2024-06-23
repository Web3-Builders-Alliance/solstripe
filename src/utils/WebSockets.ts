// webSocket.js

let socket: WebSocket;

export const initializeWebSocket = (dispatch: any) => {
  socket = new WebSocket("wss://your-websocket-server-url");

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    // dispatch(updateTokenData(data));
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };
};

export const closeWebSocket = () => {
  if (socket) {
    socket.close();
  }
};
