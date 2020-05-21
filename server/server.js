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
let nicknames = {};
//TODO: secure disconnect et changeNick
io.on("connect", (socket) => {
    console.log("New client connected");
    socket.emit("connect", "hello world");
    socket.on("/nick", (val) => {
        if (nicknames[val] === undefined){
            socket.nickname = val;
            nicknames[val] = val;
            socket.emit("/newNick");
        }
        else socket.emit("/errorNick")
    });
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
    socket.on("getBoard", () => {
        socket.emit("board", JSON.stringify(board));
        console.log(board)
    });
    socket.on("getBoardMessages", (val) => socket.emit("sendBoardMessages", JSON.stringify(board.filter(x => x.name === val))));
    socket.on("chat", (val) => board.push({name: val, messages: []}));
});