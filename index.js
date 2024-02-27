const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const http = require("http");
const socket = require("socket.io");
const app = express();
const server = http.createServer(app);
const {Server} = require("socket.io")

const io = new Server(server, {
  cors: {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  },
});

const { ExpressPeerServer } = require("peer");
const opinions = {
  debug: true,
};
app.use("/peerjs", ExpressPeerServer(server, opinions));
app.use(express.static("public"));

io.on("connection", (socket) => {

  console.log("SOCKET INIT")

  socket.on("join-room", (roomId, userId, userName) => {
    socket.join(roomId);
    console.log(userId, "joined room");
    setTimeout(() => {
      socket.broadcast.to(roomId).emit("user-connected", userId);
    }, 1000);
    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message, userName);
    });
    // Listen for disconnect event
    socket.on("disconnect", () => {
      console.log(userId, "disconnected");

      // Broadcast to others that a user has disconnected
      io.to(roomId).emit("user-disconnected", userId);
    });
  });
});

// Create an instance of Server
// socketHandler(io);
//store image in cloud
const cloudinary = require("cloudinary");

//accept image
const multiparty = require("connect-multiparty");

cloudinary.config({
  cloud_name: "duhlo06nb",
  api_key: "617821885829489",
  api_secret: "7hELqPjemOLTQMHygIAsDJmpGME",
});

//cors policy
const corsPolicy = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsPolicy));
//accept image middleware
app.use(multiparty());
// app.use(fileUpload());

//dotenv config
dotenv.config();

//mongodb connection
const connectDB = require("./database/db");

connectDB();

app.use(express.json());

app.use("/api/mentee", require("./routes/menteeRoutes"));
// http://localhost:5000/api/mentee/signup

app.use("/api/mentor", require("./routes/mentorRoutes"));
// http://localhost:5000/api/mentor/signup

app.use("/api/session", require("./routes/sessionRoutes"));
// http://localhost:5000/api/session/create

app.use("/api/article", require("./routes/articleRoutes"));
// http://localhost:5000/api/article/createArticle

const PORT = process.env.PORT || 5000; // Use a default port if PORT is not defined

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
