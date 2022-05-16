const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3500;

app.use(cors());

app.get("/shows", (req, res) => {});

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
