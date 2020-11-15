const mongoose = require('mongoose');
const { ForbiddenError } = require('apollo-server');
const Link = require('../models/link.model');
const User = require('../models/user.model');
const { getUser, getToken } = require('../helpers/utils');

const createLink = async (_, args, context, ___) => {
  const { url, description } = args;

  const token = getToken(context.token);
  const { user } = getUser(token);

  const link = new Link({
    url,
    description,
    createdAt: new Date(),
    postedBy: mongoose.Types.ObjectId(user._id),
    votes: [], // there will be no votes initially
    comments: [], // there will be no comments initially, as well
  });

  await User.findOneAndUpdate({ _id: user._id }, { $inc: { points: 2 } });

  const response = await link
    .save()
    .then((res) => res.populate('postedBy').execPopulate());

  return response;
};

const links = async () => {
  try {
    const links = await Link.find({})
      .populate('postedBy')
      .populate('votes')
      .populate({ path: 'comments', populate: { path: 'postedBy' } })
      .exec();

    return links;
  } catch (error) {
    console.log(error);
  }
};

const link = async (_, args, __, ___) => {
  const { id } = args;

  const response = await Link.findById(id)
    .populate('postedBy')
    .populate('votes')
    .populate({
      path: 'comments',
      populate: [{ path: 'postedBy' }, { path: 'votes' }],
    })
    .exec();

  return response;
};

const deleteLink = async (_, args, context, __) => {
  const { id } = args;

  const token = getToken(context.token);
  const { user } = getUser(token);

  const userFromDB = await User.findById(user._id);

  if (userFromDB && userFromDB.password === user.password) {
    const link = await Link.findById(id);
    const response = await link.deleteOne();

    return response;
  }

  throw new ForbiddenError('User not authorized!');
};

module.exports = {
  createLink,
  deleteLink,
  links,
  link,
};
