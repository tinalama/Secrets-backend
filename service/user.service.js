const { hash } = require("bcryptjs");
const User = require("../models/users.model");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw error;
  }
};

const signupUsers = async (userData) => {
  try {
    hashedPassword = await hash(userData.password, 10);
    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
    });
    return newUser;
  } catch (error) {
    throw error;
  }
};

const loginUsers = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }

    const isPasswordValid = await bycrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      user: {
        _id: user._id,
        email: user.email,
        f_name: user.f_name,
        l_name: user.l_name,
      },
      token,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  signupUsers,
  loginUsers,
};
