const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});

let User = mongoose.model("User", userSchema);

module.exports.User = User;
