const express = require("express");
const http = require("http");
const app = express();
const path = require('path');
const cors = require("cors");

// Middleware
app.use(cors());

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a catch-all route that serves the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = http.createServer(app);

// Initialize Socket.IO with CORS configuration
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST"], // Allow GET and POST methods
    credentials: true // Allow credentials
  }
});

const users = {};
const socketToRoom = {};

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join room", (roomID) => {
    console.log(`Client ${socket.id} joined room ${roomID}`);

    if (users[roomID]) {
      const length = users[roomID].length;
      if (length >= 4) { // Check if the room has reached its maximum capacity
        socket.emit("room full");
        console.log(`Room ${roomID} is full, client ${socket.id} cannot join`);
        return;
      }
      users[roomID].push(socket.id);
    } else {
      users[roomID] = [socket.id];
    }

    socketToRoom[socket.id] = roomID;

    const usersInThisRoom = users[roomID];
    socket.emit("all users", usersInThisRoom);
    console.log(`Users in room ${roomID}:`, usersInThisRoom);
  });

  socket.on("sending signal", (payload) => {
    console.log(`Sending signal from ${socket.id} to ${payload.userToSignal}`);
    io.to(payload.userToSignal).emit("user joined", {
      signal: payload.signal,
      callerID: payload.callerID,
    });
  });

  socket.on("returning signal", (payload) => {
    console.log(`Returning signal from ${socket.id} to ${payload.callerID}`);
    io.to(payload.callerID).emit("receiving returned signal", {
      signal: payload.signal,
      id: socket.id,
    });
  });

  socket.on("disconnect", () => {
    const roomID = socketToRoom[socket.id];
    let room = users[roomID];
    if (room) {
      console.log(`Client ${socket.id} left room ${roomID}`);
      room = room.filter((id) => id !== socket.id);
      users[roomID] = room;
      socket.broadcast.emit("user left", socket.id);
    }
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);