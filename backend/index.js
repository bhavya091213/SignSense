const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { spawn } = require("child_process");
const path = require("path");
const { Ollama } = require("ollama");
const fs = require("fs").promises;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies
require("dotenv").config();
const port = process.env.SERVER || 3000;

let pythonProcess = null;

io.on("connection", (socket) => {
  console.log("Client connected");

  // Start Python process with correct path to temp.py
  pythonProcess = spawn("python", [path.join(__dirname, "../ASL/temp.py")]);

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

app.post("/generate_audio", async (req, res) => {
  const { text, language_code } = req.body;

  try {
    const exampleAudio = await fs.readFile(
      path.join(__dirname, "audio/exampleaudio.mp3"),
    );
    const exampleAudio2 = await fs.readFile(
      path.join(__dirname, "audio/silence_100ms.wav"),
    );

    const { Client } = await import("@gradio/client");
    const client = await Client.connect("http://localhost:7860/");
    const result = await client.predict("/generate_audio", {
      model_choice: "Zyphra/Zonos-v0.1-transformer",
      text: text,
      language: language_code,
      speaker_audio: exampleAudio,
      prefix_audio: exampleAudio2,
      e1: 1,
      e2: 0.05,
      e3: 0.05,
      e4: 0.05,
      e5: 0.05,
      e6: 0.05,
      e7: 0.1,
      e8: 0.2,
      vq_single: 0.78,
      fmax: 24000,
      pitch_std: 45,
      speaking_rate: 15,
      dnsmos_ovrl: 4,
      speaker_noised: false,
      cfg_scale: 2,
      top_p: 0,
      top_k: 0,
      min_p: 0,
      linear: 0.5,
      confidence: 0.4,
      quadratic: 0,
      seed: 420,
      randomize_seed: true,
      unconditional_keys: ["emotion"],
    });

    const generated_audio_path = result.data[0];
    const seed_used = result.data[1];

    res.json({
      generated_audio_path,
      seed_used,
    });
  } catch (error) {
    console.error("Error generating audio:", error);
    res.status(500).json({ error: "Failed to generate audio" });
  }
});

app.post("/grammar", async (req, res) => {
  const { question } = req.body;

  try {
    const ollama = new Ollama({ host: "http://127.0.0.1:11434" });
    const response = await ollama.chat({
      model: "airat/karen-the-editor-v2-strict:latest",
      messages: [
        {
          role: "user",
          content:
            "You are an advanced grammar-checking assistant. Your task is to analyze the given text and provide a grammatically correct version while preserving its meaning. Respond with ONLY the corrected text. Do NOT add any more words just fix spelling and punctuation " +
            question,
        },
      ],
    });

    console.log("Ollama response:", JSON.stringify(response, null, 2));

    // Extract the answer from the response
    const answer = response.message.content;

    res.json({ answer });
  } catch (error) {
    console.error("Error getting response from Ollama:", error);
    res.status(500).json({ error: "Failed to get response from Ollama" });
  }
});

httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
