import App from "./config/config.js";
import { Server } from "socket.io";

const port = process.env.PORT || process.env.APP_PORT;
const io = new Server(3001);

// Websockets
io.on("connection", (socket) => {

    console.log(`New connection`);

});

// Start server
App.http.listen(port, () => console.log(`API escuchando en puerto: ${port}`));