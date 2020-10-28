const { ValidationError } = require('apollo-server');
const validator = require('validator');
const User = require('../models/user.model');
const Link = require('../models/link.model');

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
      createdAt: new Date(),
    });
    const response = await user.save();

    return response;
  } catch (error) {
    console.log(error);
  }
};

const user = async (_, args, __, ___) => {
  const { username } = args;

  try {
    const user = await User.findOne({ username });
    const links = await Link.find({ postedBy: user.id });

    return { ...user.toJSON(), links };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { user, createUser };
