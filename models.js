const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
  Username: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});

const user = mongoose.model("users", userSchema);

module.exports = user;
