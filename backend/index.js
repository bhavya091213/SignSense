const express = require("express");
const app = express();
const { spawn } = require("child_process").spawn;
require("dotenv").config();
const port = process.env.SERVER || 3000;

app.get("/", (req, res) => {
  res.send(port);
});

app.listen(port, () => {
  console.log(`Example app listenxing on port ${port}`);
});
