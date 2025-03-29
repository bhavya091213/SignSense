const express = require("express");
const cors = require("cors");

//kmulter
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// app
const app = express();

// Enable CORS
app.use(cors());

// dotenv
require("dotenv").config();
const port = process.env.SERVER || 3000;

// spawn async (child_process)
const { spawn } = require("child_process").spawn;

app.get("/", (req, res) => {
  console.log("faggot");
  res.send("hello wrld");
});
app.post("/uploadFrame", upload.single("frame"), (req, res) => {
  res.send(port);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
