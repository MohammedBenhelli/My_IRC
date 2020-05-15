const port = process.env.PORT || 4242;
const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());
const server = app.listen(port, () => {
    console.log("Server listening on port 4242");
});
const io = require('socket.io')(server)

let board = {
    home: {
    }
};

io.on("connect", (socket) => {
    console.log("New client connected");
    socket.emit("connect", "hello world");
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
    socket.on("getBoard", () => {
        console.log(board)
    })
});