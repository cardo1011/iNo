import { io } from "../servers.js";

let playerCount = 0;

function socketHandlers() {
  io.on("connection", (socket) => {
    //Acknowledge player has came online.
    socket.on("newConnection", () => {
      playerCount++;
      console.log(
        `=======\nPlayer_${playerCount} connected to server\n=======`
      );
    });
    // Connects player to room in order to initialize the game and provides them their socket ID to have their friend join the same room.
    socket.on("inviteFriend", (room) => {
      socket.join(room);
      console.log(`Player joined room: ${room}`);

      io.emit("sendRoom", room);
      console.log(`Room code sent back to client: ${room}`);
    });

    socket.on("joinFriend", (room) => {
      socket.join(room);
      console.log(`Friend has joined room: ${room}`);
    });
  });
}
export default socketHandlers;
