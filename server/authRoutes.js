const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./db/userSchema");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error registering user." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log(email);
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log(user.password);
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id }, "super-secret-key", {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
      .status(200)
      .json({ message: "Logged in successfully.", accessLevel: user.accessLevel });
  } catch (error) {
    res.status(500).json({ message: "Error logging in." });
  }
});

router.post("/logout", (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logged out successfully." });
});


router.get('/users', async (req, res) => {
  if (req.session.user && req.session.accessLevel === 3) {
    const users = await User.find({});
    res.json(users);
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
});

router.delete('/users/:userId', async (req, res) => {
  // Check if the user is logged in and has access level 3
  if (req.session.user && req.session.accessLevel === 3) {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: 'User deleted' });
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
});

module.exports = router;
