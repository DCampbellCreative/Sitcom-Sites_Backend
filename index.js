const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const app = express();

app.use(express.json());

const uri = process.env.ATLAS_URI;

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
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        res.status(200).send({ result });
      });
  });
});

// listen for requests
// const port = process.env.PORT || 8080;
// app.listen(port, "0.0.0.0", () => {
//   console.log("Listening on Port " + port);
// });

app.listen(process.env.PORT || 8080, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
