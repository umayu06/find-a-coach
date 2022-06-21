/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = req.headers['access-token'];
  if (!token) res.status(403).send('Access Denied!');

  try {
    await jwt.verify(token, process.env.SECRET);
  } catch (error) {
    res.status(401).json(error.message);
  }
  next();
};

module.exports = verifyToken;
