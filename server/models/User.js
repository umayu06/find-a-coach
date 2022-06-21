/* eslint-disable no-undef */
const mongoose = require('mongoose');

const jobDetails = mongoose.Schema({
  areas: { type: Array, required: true },
  hourlyRate: { type: Number, required: true },
  description: { type: String, required: true },
});

const contactDetails = mongoose.Schema({
  contactEmail: { type: String, required: true },
  description: { type: String, required: true },
});

const userData = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jobDetails: {
    type: Object,
    children: jobDetails,
  },
  contactDetails: {
    type: Object,
    children: contactDetails,
  },
});

module.exports = mongoose.model('User', userData);
