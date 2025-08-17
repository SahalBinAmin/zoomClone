require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const port = process.env.PORT || 3002;
const mongoUri = process.env.MONGO_URL;


//------------------------MongoDb Connection----------------------------
main()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoUri);
}
//--------------------------      End   ---------------------------------- 


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});

app.get("/home", (req, res) => {
  res.json("hello world");
});
