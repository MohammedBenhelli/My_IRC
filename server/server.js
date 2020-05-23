const port = process.env.PORT || 4242;
import express from 'express';
import cors from "cors";
const app = express();
app.use(cors());
const server = app.listen(port, () => {
    console.log("Server listening on port 4242");
});
const io = require('socket.io')(server)

let board ={
    home: {
        name: "home",
        messages: [{
            text: "hello world",
            autor: "admin"
        }],
        autor: "Admin"
    }
}
;
let nicknames = {};
//TODO: secure disconnect et changeNick
io.on("connect", (socket) => {
    console.log("New client connected");
    socket.emit("connect", "hello world");
    socket.on("/nick", (val) => {
        if (nicknames[val] === undefined){
            if (socket.username !== undefined)
                delete nicknames[socket.username];
            socket.username = val;
            nicknames[val] = val;
            socket.emit("/newNick");
        }
        else socket.emit("/errorNick")
    });
    socket.on("disconnect", () => {
        console.log(`${socket.username} disconnected`);
        delete nicknames[socket.username];
    });
    socket.on("getBoard", () => {
        socket.emit("board", JSON.stringify(board));
        console.log(board)
    });
    socket.on("getBoardMessages", (val) => socket.emit("sendBoardMessages", JSON.stringify(board[val])));
    socket.on("chat", (val) => {
        if (board[val] === undefined)
            board[val] = {name: val, messages: [], autor: socket.username};
        else socket.emit("/errorBoard");
    });
    socket.on("newMessage", (val) => {
        board[val.board].messages.push({autor: val.autor, text: val.message});
        io.sockets.emit("refreshBoard", val.board);
    });
});