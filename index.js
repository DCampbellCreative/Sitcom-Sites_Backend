const express = require("express");
const cors = require("cors");
const router = express.Router();
const { MongoClient } = require("mongodb");

// configuration for local development
// require("dotenv").config({ path: "./config.env" });

const app = express();
app.use(express.json());
app.use(cors());

const mongoose = require("mongoose");
const Models = require("./models.js");

// model for users created in models.js
const users = Models.user;

// environmental variable created on Heroku
const uri = process.env.CONNECTION_URI;

// connect to database
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// connect to mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// get info about all shows
app.get("/shows", function (req, res, next) {
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

// register a new user
app.post("/users", (req, res) => {
  // check if user already exists
  users
    .findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.username + "already exists");
      } else {
        // if user doesn't exist create one
        users
          .create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
          })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// get a user by username
app.get("/users/:username", (req, res) => {
  users
    .findOne({ username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// update user
app.put("/users/:username", (req, res) => {
  users.findOneAndUpdate(
    { username: req.params.username },
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
      },
    },
    { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error: " + err);
      } else {
        res.json(updatedUser);
      }
    }
  );
});

// creates server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("App is running on port " + port);
});
