const express = require("express");
const cors = require("cors");
const router = express.Router();
const { MongoClient } = require("mongodb");
// require("dotenv").config({ path: "./config.env" });

const app = express();
app.use(express.json());
app.use(cors());

const uri = process.env.CONNECTION_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", function (req, res, next) {
  client.connect(function (err, db) {
    if (err) throw err;
    var dbo = db.db("sitcom_sites");
    dbo
      .collection("shows")
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        db.close();
        res.status(200).send(result);
      });
  });
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("App is running on port " + port);
});
