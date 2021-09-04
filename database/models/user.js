const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

UserSchema.query.byUsername = function (username) {
  return this.where({ username: new RegExp(username, "i") });
};

UserSchema.query.byEmail = function (email) {
  return this.where({ email: new RegExp(email, "i") });
};

const User = mongoose.model("users", UserSchema);

module.exports = User;
