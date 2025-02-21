const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
