const req = require("express/lib/request");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let userSchema = new mongoose.Schema({
  username: String,
  passward: String,
  role: String,
});

userSchema.methods.matchPassword = async function (enteredPassward) {
  return await bcrypt.compare(enteredPassward, this.passward);
};

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassward = await bcrypt.hash(this.passward, salt);
    this.passward = hashedPassward;
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("users", userSchema);
module.exports = User;
//module.exports = mongoose.model("users", userSchema);
