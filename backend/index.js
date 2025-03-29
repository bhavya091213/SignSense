const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { spawn } = require("child_process");
const path = require("path");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
require("dotenv").config();
const port = process.env.SERVER || 3000;

let pythonProcess = null;

io.on("connection", (socket) => {
  console.log("Client connected");
  
  // Start Python process with correct path to temp.py
  pythonProcess = spawn("python", [
    path.join(__dirname, "../ASL/temp.py")
  ]);
  
  pythonProcess.stdout.on("data", (data) => {
    console.log("Python output:", data.toString());
    socket.emit("processing-result", data.toString());
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error("Python error:", data.toString());
  });

  socket.on("video-frame", (frameData) => {
    if (pythonProcess && pythonProcess.stdin.writable) {
      pythonProcess.stdin.write(JSON.stringify({ frame: frameData }) + "\n");
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    if (pythonProcess) {
      pythonProcess.kill();
      pythonProcess = null;
    }
  });
});

httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
