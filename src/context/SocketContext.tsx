import { useState, createContext, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext<any>(undefined);

export const SocketProvider = ({ children }: { children: any }) => {
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    if (socket == null) {
      const socket = io();
      setSocket(socket);
      //  socket.emit("add-user", user.id);
      //  socket.on("trip-stop-added",user);
    }

    if (socket) {
      // const joinTrip = (tripId:string)=>{
      //   socket.emit("join-trip",tripId);
      //  socket.on('join-trip-success',()=>{
      //   console.log("new user joined ");
      //  })
    }
    // console.log(usertrips.trips);
  }, []);

  return (
    <>
      <SocketContext.Provider value={{ socket }}>
        {children}
      </SocketContext.Provider>
    </>
  );
};

export default SocketContext;
