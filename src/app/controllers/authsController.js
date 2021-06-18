const bcrypt = require('bcrypt');
const authsModel = require('../models/authsModel');
const jwt = require('jsonwebtoken');
const createErrors = require('http-errors');
class AuthsController {
  //[POST] Login User
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await authsModel.findOne({ username });
      if (!user) {
        throw createErrors(404, "Username doesn't not exists");
      }
      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) {
        throw createErrors(400, 'Password is not correct');
      }

      const accessToken = createAccessToken({ _id: user._id, role: user.role });
      delete user.password;

      res.status(200).json({ accessToken, user, message: 'Login is successfully' });
    } catch (error) {
      next(error);
    }
  }
  //[POST] Create User
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      let passwordHash;
      if (password) {
        passwordHash = await bcrypt.hash(password, 10);
      }
      const newUser = new authsModel({
        ...req.body,
        password: passwordHash,
      });
      await newUser.save();
      //Create access_token
      const accessToken = createAccessToken({ _id: newUser._id, role: newUser.role });
      // newUser.delete('password');
      delete newUser.password;

      res.status(201).json({ message: 'Create User Successfully', accessToken, newUser });
    } catch (error) {
      next(error);
    }
  }
}

<<<<<<< HEAD

=======
>>>>>>> 2ce6598d3fe2317b687e8360f000b2ad085da272
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};
module.exports = new AuthsController();
