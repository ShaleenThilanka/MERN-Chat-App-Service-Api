const express = require("express");
const http = require("http");
const chats = require("./data/data");
const dotenv = require("dotenv")
const app = express();
dotenv.config();
const port = process.env.PORT || 5000
const server = http.createServer(app);

app.get("/",(req, res)=>{
res.send("Api was running");
})

app.get("/api/chat",(req, res)=>{
    res.send(chats);
})

app.listen(port,console.log("Server started on "+port));