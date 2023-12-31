const mongoose = require("mongoose");

const Users = new mongoose.Schema(
  {
    username: String,
    name: String,
    email: String,
    contact: String,
    password: String,
    role: String,
  },
  { timestamps: true }
);

const User = mongoose.models.Users || mongoose.model("Users", Users);

module.exports = User;
