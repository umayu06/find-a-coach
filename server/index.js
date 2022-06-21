/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.route');

const connectDB = require('./DBConnection');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server started at port ${process.env.PORT}`);
});
