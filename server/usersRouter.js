const express = require('express')
//létrehozunk egy példányt a Router objektumból, melyre felkonfigurálhatjuk a különböző HTTP műveletekkel elérhető route-okat
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('user');


// #2 a users fájl tartalmát kicsit átírtam

// Middleware a felhasználók lekérdezése előtt az id alapján - nem minden route-ra kell meghívnunk
// NodeJS-ben async jelöli az aszinkron műveleteket, amelyeknek a lefutási ideje nem determinisztikus, és
// az await várakozási parancsot akarjuk bennük használni
async function getUser(req, res, next) {
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'A felhasználó nem található' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.user = user; // ettől kezdve a response-ban benne van a db-ből lekért user objektum
  next();
}

// GET /users - összes felhasználó lekérdezése
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /users/:id - egy felhasználó lekérdezése az id alapján
router.get('/:id', getUser, (req, res) => { //ez is egy middleware használati módszer, 
  // a getUser middleware ilyenkor le fog futni a kérés feldolgozása előtt 
  res.json(res.user); //egyszerűsített válaszküldés, a megadott objektumot json-re konvertálva küldjük el
});

// POST /users - új felhasználó létrehozása
router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    accessLevel: req.body.accessLevel,
    birthdate: req.body.birthdate,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH /users/:id - egy felhasználó frissítése az id alapján
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }
  if (req.body.accessLevel != null) {
    res.user.accessLevel = req.body.accessLevel;
  }
  if (req.body.birthdate != null) {
    res.user.birthdate = req.body.birthdate;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /users/:id - egy felhasználó törlése az id alapján
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'A felhasználó sikeresen törölve!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* Ha egy fájl require-el behivatkozza ezt a fájlt, akkor a hivatkozás helyére a module.exports-ban megadott objektum, funkció 
vagy változó fog bekerülni */
module.exports = router