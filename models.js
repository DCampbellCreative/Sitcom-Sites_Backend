const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

let userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

// const User = mongoose.model("users", userSchema);

// module.exports = User;

// const User = mongoose.model("users", userSchema);

module.exports = mongoose.model("users", userSchema);
