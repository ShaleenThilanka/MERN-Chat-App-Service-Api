const express = require("express");
const http = require("http");
const app = express();
const port = process.env.PORT || 5000
const server = http.createServer(app);

app.get("/",(req, res)=>{
res.send("Api was running");

})

app.listen(port,console.log("Server started on "+port));