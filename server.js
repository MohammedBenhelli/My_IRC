import express from "express";
import App from "./src/app";
import React from "react";
import hbs from "handlebars";
import ReactDOMServer from 'react-dom/server';
import fs from "fs";
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
    console.log("New client connected");
    socket.emit("connect", "hello world");
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

app.get("/", (req, res) => {
    const html = fs.readFileSync(__dirname + "/views/index.html", "utf-8");
    const hbsTemplate = hbs.compile(html);
    const reactComp = ReactDOMServer.renderToString(<App/>);
    res.send(hbsTemplate({react: reactComp}));
});

app.listen(4242, () => {
    console.log("Server listening on port 4242");
});