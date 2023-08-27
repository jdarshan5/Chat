import { io } from "socket.io-client";

import { BASE_URL } from "../api";

import store from "../store";

const socket = io(`${BASE_URL}`, {
  autoConnect: false,
});

export default socket;