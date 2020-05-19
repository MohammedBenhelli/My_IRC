const port = process.env.PORT || 4242;
const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());
const server = app.listen(port, () => {
    console.log("Server listening on port 4242");
});
const io = require('socket.io')(server)

let board =
    [{
        name: "home",
        messages: ["hello world"]
    }]
;

io.on("connect", (socket) => {
    console.log("New client connected");
    socket.emit("connect", "hello world");
    socket.on("name", (val) => {
        console.log(val);
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
    socket.on("getBoard", () => {
        socket.emit("board", JSON.stringify(board));
        console.log(board)
    });
    socket.on("chat", (val) => board.push({name: val, messages: []}));
});