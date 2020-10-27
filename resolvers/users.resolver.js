const { ValidationError } = require('apollo-server');
const validator = require('validator');
const User = require('../models/user.model');

const createUser = async (_, args, __, ___) => {
  const { username, email, password } = args;

  // validate data coming from client
  if (!validator.isEmail(email)) throw new ValidationError('Invalid email');
  else if (!validator.isLength(username, { min: 3, max: 18 }))
    throw new ValidationError('Invalid username!');
  else if (!validator.isLength(password, { min: 6 }))
    throw new ValidationError('Password is not strong enough!');

  try {
    const user = new User({
      username,
      email,
      password,
      createdAt: new Date(),
    });
    const response = await user.save();

    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createUser };
