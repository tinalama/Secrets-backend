const userService = require("../service/user.service");

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const signupUsers = async (req, res) => {
  try {
    const users = await userService.signupUsers(req.body);
    res.status(201).json(users);
  } catch (err) {
    console.error("Error signing up user:", err);
    res.status(400).json({ message: err.message });
  }
};

const loginUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.loginUsers(email, password);
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    return res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllUsers,
  signupUsers,
  loginUsers,
};
