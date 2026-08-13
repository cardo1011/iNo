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
      socket.emit("sendRoom", room);
    });

    // Connects second player to
    socket.on("joinFriend", (room) => {
      // Accessing the rooms Map provided by socket.io
      const rooms = io.of("/").adapter.rooms;

      // Verify the room provided by the players exists before allowing them to join the game
      if (rooms.includes(room)) {
        socket.join(room);
        io.to(room).emit("showAlert", `Your opponent has joined the game`);
      }
    });
  });
}
export default socketHandlers;
