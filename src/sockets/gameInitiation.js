import { io } from "../servers.js";
import fetchQuestions from "../services/triviaService.js";

function acknowledgePlayerConnectingToServer(playerCount, sock) {
  //Acknowledge player has came online.
  sock.on("newConnection", () => {
    console.log(`=======\nPlayer_${playerCount} connected to server\n=======`);
  });
}

// Connects player to room in order to initialize the game and provides them their socket ID to have their friend join the same room.
function inviteFriend(sock) {
  sock.on("inviteFriend", (room) => {
    sock.join(room);
    sock.emit("sendRoom", room);
  });
}

// Connects second player to same room as their friend
function joinFriend(sock) {
  sock.on("joinFriend", async (room) => {
    // Verify the room provided by the players exists before allowing them to join the game

    // Accessing the rooms Map provided by socket.io
    const rooms = io.of("/").adapter.rooms;

    if (rooms.has(room)) {
      sock.join(room);
      io.to(room).emit("showAlert", `Your opponent has joined the game`);

      // waits for the array of question objects before sending it over to the front end
      let questionsArr = await fetchQuestions();
      io.to(room).emit("renderQuestions", questionsArr);
    }
  });
}

export { acknowledgePlayerConnectingToServer, inviteFriend, joinFriend };
