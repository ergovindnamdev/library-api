const express = require("express");
const User = require("../database/schema/user");
const config = require("../auth/config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

async function signUp(req, res) {
  const { username, name, email, contact, role } = req.body;
  try {
    const user = await User.create({
      username,
      name,
      email,
      contact,
      role,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    return res.status(200).send(user);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
}

async function signIn(req, res) {
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  });
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  } else {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        config.secret,
        {
          algorithm: "HS256",
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        }
      );

      res.status(200).send({
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken: token,
      });
    });
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}

async function getUsersByEmail(req, res) {
  try {
    const users = await User.find({ email: req.body.email });
    return res.status(200).send(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}

async function updateUserById(req, res) {
  const { id } = req.params;
  const { username, name, email, contact, role, password } = req.body;

  try {
    const updateFields = { username, name, email, contact, role };
    if (password) {
      updateFields.password = password;
    }
    const user = await User.findByIdAndUpdate(id, updateFields, { new: true });
    
    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
}

module.exports = {
  signUp,
  getUsers,
  updateUserById,
  deleteUser,
  getUsersByEmail,
  signIn,
};
