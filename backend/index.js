require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const SocketManager = require("./src/controllers/SocketManager");
const userRoutes = require("./src/routes/users.routes");

//Environment vairables
const port = process.env.PORT || 3002;
const mongoUri = process.env.MONGO_URL;

//MongoDb Connection
main()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoUri);
}
//End

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

SocketManager(io);

server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

app.use("/api/v1/users", userRoutes);

app.get("/home", (req, res) => {
  res.json("hello world");
});
