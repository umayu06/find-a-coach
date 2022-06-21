/* eslint-disable no-unused-vars, no-undef */
const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).json({ message: 'Invalid Email! or Email not registered!' });
    return;
  }

  const verifyPassword = await bcrypt.compare(req.body.password, user.password);
  if (!verifyPassword) {
    res.status(400).json({ message: 'Invalid password!' });
    return;
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.SECRET
  );
  res.status(200).json({ token, id: user._id });
});

router.post('/registration', async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    await user.save();
    res.status(200).json({ message: 'User created!' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'User is already registered!' });
  }
});

module.exports = router;
