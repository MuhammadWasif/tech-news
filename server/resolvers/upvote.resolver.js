const Comment = require('../models/comment.model');
const Link = require('../models/link.model');
const { getUser, getToken, UPVOTE_LINK } = require('../helpers/utils');

const upvoteLink = async (_, args, context, __) => {
  // if link is already upvoted then calling this mutation will downvote the link
  const { id } = args;
  const { pubsub } = context;

  const token = getToken(context.token);
  const { user } = getUser(token);

  const link = await Link.findById(id);

  const response = link.votes.includes(user._id)
    ? await Link.findOneAndUpdate(
        { _id: id },
        { $pull: { votes: user._id } },
        { new: true }
      )
    : await Link.findOneAndUpdate(
        { _id: require('mongoose').Types.ObjectId(id) },
        { $push: { votes: user._id } },
        { new: true }
      );

  pubsub.publish(UPVOTE_LINK, {
    upvoteLink: {
      ...response.toJSON(),
      id: require('mongoose').Types.ObjectId(response._id),
    },
  });
  return response;
};

const upvoteComment = async (_, args, context, __) => {
  // if comment is already upvoted then calling this mutation will downvote the comment
  const { id } = args;

  const token = getToken(context.token);
  const { user } = getUser(token);

  const comment = await Comment.findById(id);

  // check if it's already upvoted
  if (comment.votes.includes(user._id)) {
    const response = await Comment.findOneAndUpdate(
      { _id: id },
      { $pull: { votes: user._id } }
    );

    return response;
  }

  const response = await Comment.findOneAndUpdate(
    { _id: id },
    { $push: { votes: user._id } }
  );

  return response;
};

module.exports = { upvoteLink, upvoteComment };
