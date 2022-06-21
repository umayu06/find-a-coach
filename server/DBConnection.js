/* eslint-disable no-undef */
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('DB Connected!');
  } catch (e) {
    console.log('DB not connected: ' + e);
  }
};

module.exports = connectDB;
