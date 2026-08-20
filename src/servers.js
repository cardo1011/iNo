import app from "./app.js";
import { Server } from "socket.io";
import http from "http";

/**
 * Create HTTP server.
 */

const httpServer = http.createServer(app);

/**
 * Create WebSocket server.
 */

const io = new Server(httpServer);

export { httpServer, io };
