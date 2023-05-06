const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./db/userSchema");
const FavoriteCity = require("./db/favCitySchema");
const passport = require("passport");

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

    res.status(201).json({
      message: "User registered successfully.",
      accessLevel: newUser.accessLevel,
      cities: newUser.cities,
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user." });
  }
});

router
  .route("/login")
  .post(passport.authenticate("local"), async function (req, res) {
    const user = await User.findOne({ email: req.body.email });
    res
      .status(200)
      .json({
        message: "Yeee",
        accessLevel: user.accessLevel,
        cities: user.cities,
      });
  });


router.post("/logout", (req, res) => {
  res
    .clearCookie("connect.sid")
    .status(200)
    .json({ message: "Logged out successfully." });
});

router.post("/users", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.user });
    if (req.body.user && user.accessLevel === 3) {
      console.log(
        "user: " + req.body.user,
        "accessLevel_: " + user.accessLevel
      );
      const users = await User.find({});
      res.json(users);
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  } catch (error) {
    res.status(500).json({ message: "Invalid user error." });
  }
});

router.delete("/userdel/:userId", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Invalid user error." });
  }
});

router.post("/update-cities", async (req, res) => {
  const { email, cities } = req.body;
  try {
    await User.updateOne({ email }, { $set: { cities } });
    res.json({ success: true, message: "Cities updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update cities" });
  }
});

router.get("/getfavorites", async (req, res) => {
  try {
    const favoriteCities = await FavoriteCity.find({});
    res.json({ success: true, favoriteCities });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch favorite cities" });
  }
});

router.post("/addfavorites", async (req, res) => {
  const { userEmail, cityName } = req.body;

  try {
    const favoriteCity = new FavoriteCity({ userEmail, cityName });
    await favoriteCity.save();
    res.json({ success: true, message: "Favorite city added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to add favorite city" });
  }
});

router.delete("/delfavorites", async (req, res) => {
  const { userEmail, cityName } = req.body;

  try {
    await FavoriteCity.deleteOne({ userEmail, cityName });
    res.json({ success: true, message: "Favorite city removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to remove favorite city" });
  }
});

router.get("/favorites", async (req, res) => {
  try {
    const favoriteCities = await FavoriteCity.find();
    res.json({ success: true, favoriteCities });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch favorite cities" });
  }
});

router.post("/addfavorites", async (req, res) => {
  const { userEmail, cityName } = req.body;

  try {
    const favoriteCity = new FavoriteCity({ userEmail, cityName });
    await favoriteCity.save();
    res.json({ success: true, message: "Favorite city added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to add favorite city" });
  }
});

router.delete("/delfavorites", async (req, res) => {
  const { userEmail, cityName } = req.body;

  try {
    await FavoriteCity.deleteOne({ userEmail, cityName });
    res.json({ success: true, message: "Favorite city removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to remove favorite city" });
  }
});

module.exports = router;
