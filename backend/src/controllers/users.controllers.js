const User = require("../models/users.model");
const { status } = require("http-status");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const login = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: `Please provide username or password` });
  }

  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(status.NOT_FOUND).json({ message: "User not found" });
    }

    if (bcrypt.compare(password, user.password)) {
      let token = crypto.randomBytes(20).toString("hex");
      user.token = token;

      await user.save();
      res.status(status.OK).json({ token: token });
    }
  } catch (err) {
    res.status(500).json({ message: `Something went wrong ${err}` });
  }
};

const register = async (req, res) => {
  const { user, userName, password } = req.body;

  try {
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res
        .status(status.FOUND)
        .json({ message: "User already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      user: user,
      userName: userName,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(status.CREATED).json({ message: "User Registered" });
  } catch (err) {
    res.json({ message: `Something went wrong ${err}` });
  }
};
module.exports = { login, register };
