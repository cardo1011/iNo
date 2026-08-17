import { io } from "../servers.js";
import {
  acknowledgePlayerConnectingToServer,
  inviteFriend,
  joinFriend,
} from "./gameInitiation.js";

let playerCount = 0;

function socketHandlers() {
  io.on("connection", (socket) => {
    //Acknowledge player has came online.
    acknowledgePlayerConnectingToServer(playerCount, socket);

    // Connects player to room in order to initialize the game and provides them their socket ID to have their friend join the same room.
    inviteFriend(socket);

    // Connects second player to same room as their friend
    joinFriend(socket);
  });
}
export default socketHandlers;
