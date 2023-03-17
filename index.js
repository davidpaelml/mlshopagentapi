const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 8080 || process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = require("./router/router");

app.use("/api", router);

app.listen(PORT, () => console.log(`live on http://localhost:${PORT}`));
