import { io } from "../servers.js";

const currentIO = io;
let playerCount = 0;

function newPlayerConnected() {
  playerCount++;
  currentIO.on("connection", (socket) => {
    socket.on("newConnection", () => {
      //Acknowledge player has came online.
      console.log(
        `=======\nPlayer_${playerCount} connected to server\n=======`
      );
    });
  });
}

export default newPlayerConnected;
