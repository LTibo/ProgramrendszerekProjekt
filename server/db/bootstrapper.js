const mongoose = require("mongoose");
const User = mongoose.model("user");
const Favorit = mongoose.model("FavoriteCity");

async function ensureDataExists() {
  try {
    const admin = await User.findOne({ accessLevel: 3 });
    if (admin) {
      console.log("Admin user found");
    } else {
      // Ha nincs, akkor létrehozunk egy újat
      const newAdmin = new User({
        email: "admin@adminmail.com",
        password: "admin123",
        accessLevel: 3,
      });
      const newUser1 = new User({
        email: "asd@asd.com",
        password: "asd",
        accessLevel: 1,
      });
      const newUser2 = new User({
        email: "asd2@asd.com",
        password: "asd",
        accessLevel: 1,
      });
      await newAdmin.save();
      await newUser1.save();
      await newUser2.save();
      console.log("Admin user and test users created");
    }
  } catch (error) {
    console.error("Error while creating admin: ", error);
  }

  try {
    const fav = await Favorit.findOne({});
    if (fav) {
      console.log("Fav found");
    } else {
      const newFav1 = new Favorit({
        userEmail: "asd@asd.com",
        cityName: "Szeged",
      });
      const newFav2 = new Favorit({
        userEmail: "admin@adminmail.com",
        cityName: "Kecskemét",
      });
      const newUser3 = new Favorit({
        userEmail: "asd2@asd.com",
        cityName: "Budapest",
      });
      await newFav1.save();
      await newFav2.save();
      await newUser3.save();
      console.log("Fav created");
    }
  } catch (error) {
    console.error("Error while creating fav: ", error);
  }
}

module.exports = ensureDataExists;
