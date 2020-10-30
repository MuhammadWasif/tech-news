const mongoose = require('mongoose');
const Link = require('../models/link.model');
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
  });

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
      .exec();

    return links;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createLink,
  links,
};
