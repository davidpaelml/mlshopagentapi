const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 9000 || process.env.PORT;
const https = require("https");
const fs = require("fs");
const options = {
  key: fs.readFileSync("ssl/key.pem"),
  cert: fs.readFileSync("ssl/cert.pem"),
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = require("./router/router");

app.use("/api", router);

https
  .createServer(options, app)
  .listen(PORT, console.log(`live on https://localhost:${PORT}`));
