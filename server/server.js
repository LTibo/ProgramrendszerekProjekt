const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

const authRoutes = require('./authRoutes');


require('./db/userSchema');
require('./db/bootstrapper')();

app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
