// app.js
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db');

const app = express();
app.use(express.json());
app.use(express.static('public'));

connectDB();

// Simple User model
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String
}));

// GET - Fetch all users
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST - Add a user
app.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

app.listen(3000, () => console.log('🚀 Server on http://localhost:3000'));