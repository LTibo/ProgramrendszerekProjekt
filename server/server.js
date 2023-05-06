const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const expressSession = require("express-session");
const localStrategy = require("passport-local").Strategy;
const app = express();
const User = require("./db/userSchema");
app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose
  .connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

passport.use(
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    function (email, password, done) {
      console.log("asd", email, password);
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }

          // if (
          // !
          user.comparePasswords(password, function (error, isMatch) {
            console.log(error, isMatch);
            // Felhasználó által megadott jelszó ellenőrzése
            if (error) return done(error, false);
            // Hiba kezelése, ha nem sikerült összehasonlítani a jelszavakat
            if (!isMatch) return done("Hibas jelszo", false, { message: "Hibas jelszo" });
            // Sikeres belépés esetén felhasználó visszaadása
            return done(null, user);
          });
          // ) {
          //   return done(null, false);
          // }
          // return done(null, user);
        })
        .catch((err) => {
          if (err) {
            return done(err);
          }
        });
      // User.findOne({ email: email }, function (err, user) {
      //   if (err) { return done(err); }
      //   if (!user) { return done(null, false); }
      //   if (!user.comparePasswords(password)) { return done(null, false); }
      //   return done(null, user);
      // });
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log(user)
  done(null, user.email);
});

passport.deserializeUser(function (email, done) {
  console.log(email)
  User.findOne({ email })
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
});

app.use(expressSession({ secret: "prfprojekt2023", resave: true }));
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require("./authRoutes");

require("./db/bootstrapper")();

app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
