const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
const User = Models.User;

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
app.get("/shows", (req, res, next) => {
  client.connect((err, db) => {
    if (err) throw err;
    var dbo = db.db("sitcom_sites");
    dbo
      .collection("shows")
      .find()
      .toArray((err, result) => {
        if (err) throw err;
        // console.log(result);
        db.close();
        res.status(200).send(result);
      });
  });
});

// create new user
// app.post("/users", (req, res) => {
//   client.connect((err, db) => {
//     if (err) throw err;
//     var dbo = db.db("sitcom_sites");
//     dbo.collection("users").insertOne(
//       {
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//       },
//       (err, result) => {
//         if (err) {
//           console.error(err);
//           res.status(500).json({ err: err });
//           return;
//         }
//         console.log(result);
//         res.status(200).json({ ok: true });
//       }
//     );
//   });
// });

app.post(
  "/signup",
  [
    check("username", "Please Enter a Valid Username").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { username, email, password } = req.body;
    try {
      let user = await users.findOne({
        email,
      });
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists",
        });
      }

      user = new User({
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(
        payload,
        "secret",
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

// find one user by route params
app.get("/users/:username", (req, res) => {
  client.connect(function (err, db) {
    if (err) throw err;
    var dbo = db.db("sitcom_sites");
    dbo
      .collection("users")
      .findOne({ username: req.params.username }, (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
        db.close();
      });
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
    { new: true }, // make sure that the updated document is returned
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
