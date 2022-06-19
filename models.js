import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  Username: { type: String, required: true },
  Email: { type: String, required: true },
  Password: { type: String, required: true },
});

const user = mongoose.model("user", userSchema);

module.exports.user = user;
