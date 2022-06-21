/* eslint-disable no-unused-vars, no-undef */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const verifyToken = require('./verifyJWToken');

router.get('/coaches', verifyToken, async (req, res) => {
  try {
    const coaches = await UserModel.find({}, { jobDetails: 1, name: 1 });
    const coachesList = coaches
      .filter((coach) => coach.jobDetails)
      .map((coach) => {
        return {
          id: coach._id,
          name: coach.name,
          ...coach.jobDetails,
        };
      });
    res.json(coachesList);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

router.get('/requests/:id', verifyToken, async (req, res) => {
  try {
    const requests = await UserModel.find({ _id: req.params.id }, { contactDetails: 1 });
    const requestsList = requests
      .filter((request) => request.contactDetails)
      .map((request) => {
        return request.contactDetails;
      });

    res.json(requestsList);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

router.post('/addCoachDetails/:id', verifyToken, async (req, res) => {
  try {
    await UserModel.where({ _id: req.params.id }).updateOne({ jobDetails: req.body });
    const coach = await UserModel.findOne({ _id: req.params.id });
    res.json(coach.jobDetails);
  } catch (error) {
    res.status(400).send('Error in updating job details');
    console.log(error);
  }
});

router.post('/contactDetails/:id', verifyToken, async (req, res) => {
  try {
    await UserModel.where({ _id: req.params.id }).updateOne({ contactDetails: req.body });
    const coach = await UserModel.findOne({ _id: req.params.id });
    res.json(coach.contactDetails);
  } catch (error) {
    res.status(400).send('Error in updating contact details');
    console.log(error);
  }
});

module.exports = router;
