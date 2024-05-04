const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const rooms = new Map(); 
const socketToRoom = new Map();

io.on("connection", (socket) => {
  socket.on("join room", (roomID) => {
    if (rooms.has(roomID)) {
      const usersInRoom = rooms.get(roomID);
      if (usersInRoom.size > 0) {
        usersInRoom.set(socket.id, socket);
        socket.emit("all users", Array.from(usersInRoom.keys()).filter(id => id !== socket.id));
      } else {
        socket.emit("room full");
        return;
      }
    } else {
      rooms.set(roomID, new Map([[socket.id, socket]]));
      console.log(rooms);
    }
    socketToRoom.set(socket.id, roomID);
  });

  socket.on("sending signal", (payload) => {
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on("returning signal", (payload) => {
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on("disconnect", () => {
    const roomID = socketToRoom.get(socket.id);
    if (rooms.has(roomID)) {
      const usersInRoom = rooms.get(roomID);
      usersInRoom.delete(socket.id);
      if (usersInRoom.size === 0) {
        rooms.delete(roomID);
      }
      socket.broadcast.emit("user left", socket.id);
    }
    socketToRoom.delete(socket.id);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
