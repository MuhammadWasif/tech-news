const { ValidationError, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/user.model');
const Link = require('../models/link.model');
const { JWT_SECRET } = require('../helpers/utils');

const createUser = async (_, args, __, ___) => {
  const { username, email, password } = args;

  // validate data coming from client
  if (!validator.isEmail(email)) throw new ValidationError('Invalid email');
  else if (!validator.isLength(username, { min: 3, max: 18 }))
    throw new ValidationError('Invalid username!');
  else if (!validator.isLength(password, { min: 6 }))
    throw new ValidationError('Password is not strong enough!');

  // check if user already exists
  const user =
    (await User.findOne({ username })) || (await User.findOne({ username }));

  if (user) throw new Error('User already exists!');

  try {
    const user = new User({
      username,
      email,
      password,
      points: 0,
      createdAt: new Date(),
    });
    const response = await user.save();

    const token = jwt.sign({ user: response }, JWT_SECRET);

    return { user: response.toJSON(), token };
  } catch (error) {
    console.log(error);
  }
};

const user = async (_, args, __, ___) => {
  const { username } = args;

  try {
    const user = await User.findOne({ username });
    const links = await Link.find({ postedBy: user.id })
      .populate('votes')
      .populate('comments')
      .populate('postedBy')
      .exec();

    return { ...user.toJSON(), links };
  } catch (error) {
    console.log(error);
  }
};

const login = async (_, args, __, ___) => {
  const { username, password } = args;

  const user = await User.findOne({ username });

  if (!user) throw new Error('User not found!');

  const result = await bcrypt.compare(password, user.password);
  const token = jwt.sign({ user }, JWT_SECRET);

  if (result) return { user, token };
  else throw new AuthenticationError('Incorrect password');
};

module.exports = {
  user,
  createUser,
  login,
};
