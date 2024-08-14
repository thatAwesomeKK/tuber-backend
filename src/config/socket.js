import { io } from "socket.io-client";

const url = process.env.API_GATEWAY_URL;

export const socket = io(url, {
  autoConnect: false,
});
