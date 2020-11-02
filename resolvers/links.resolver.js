const mongoose = require('mongoose');
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

const comment = async (_, args, context, __) => {};

module.exports = {
  createLink,
  links,
  comment,
};
