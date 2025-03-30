const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { spawn } = require("child_process");
const path = require("path");
const { OpenAI } = require("openai");
const { Client } = require("@gradio/client");

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
  pythonProcess = spawn("python3", [path.join(__dirname, "../ASL/temp.py")]);

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
    const response_0 = await fetch(
      "https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav",
    );
    const exampleAudio = await response_0.blob();

    const response_1 = await fetch(
      "https://github.com/gradio-app/gradio/raw/main/test/test_files/audio_sample.wav",
    );
    const exampleAudio2 = await response_1.blob();

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
    const openai = new OpenAI({
      baseURL: "http://localhost:11434/v1",
      apiKey: "ollama", // required but unused
    });

    const completion = await openai.chat.completions.create({
      model: "airat/karen-the-editor-v2-creative",
      messages: [{ role: "user", content: question }],
    });

    const answer = completion.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error("Error getting response from OpenAI:", error);
    res.status(500).json({ error: "Failed to get response from OpenAI" });
  }
});

httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
