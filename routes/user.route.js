const express = require("express");
const router = express.Router();
const User = require("../models/users.model");
const {
  getAllUsers,
  signupUsers,
  loginUsers,
} = require("../controllers/user.controller");

router.get("/", getAllUsers);

router.post("/signup", signupUsers);

router.post("/login", loginUsers);

module.exports = router;
