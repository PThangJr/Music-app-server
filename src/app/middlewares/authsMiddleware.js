const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const authsModel = require('../models/authsModel');
const authsMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.header('Authorization');
    if (!accessToken) {
      throw createError(401, 'Invalid Authorization. Please Login or Register');
    }
    const token = accessToken.replace('Bearer ', '');
    const userVerify = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!userVerify) {
      throw createError(401, 'Invalid Authorization. Please Login or Register');
    }
    const user = await authsModel.findById(userVerify._id).select('-password');
    if (!user) {
      throw createError(401, 'Invalid Authorization. Please Login or Register');
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authsMiddleware;
