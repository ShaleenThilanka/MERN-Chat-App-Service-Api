const express = require("express");
const http = require("http");
const chats = require("./data/data");
const dotenv = require("dotenv")
const app = express();
dotenv.config();
const port = process.env.PORT || 5000
const server = http.createServer(app);
const colors = require("colors");
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const {notFound, errorHandler} = require("./middlewares/errorMiddlewares");
app.use(express.json());
connectDB();
app.get("/", (req, res) => {
    res.send("Api was running");
})

app.use("/api/user", userRoutes)

app.use(notFound);
app.use(errorHandler);
app.listen(port, console.log(`Server started on ${port}`.yellow.bold));