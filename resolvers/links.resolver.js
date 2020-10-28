const mongoose = require('mongoose');
const Link = require('../models/link.model');

const createLink = async (_, args, __, ___) => {
  const { url, description } = args;

  const link = new Link({
    url,
    description,
    createdAt: new Date(),
    postedBy: mongoose.Types.ObjectId('5f9989baf23ac53865f3e35f'),
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
