const Comment = require('../models/comment.model');
const Link = require('../models/link.model');
const { getUser, getToken } = require('../helpers/utils');
const { ForbiddenError } = require('apollo-server');

const postComment = async (_, args, context, __) => {
  const { text, repliedTo } = args;

  const token = getToken(context.token);
  const { user } = getUser(token);

  const comment = new Comment({
    text,
    repliedTo,
    postedBy: user._id,
    createdAt: new Date(),
    votes: [],
  });

  await Link.findByIdAndUpdate(repliedTo, {
    $push: { comments: comment._id },
  }).catch((error) => console.log('An error occurred', error));

  const response = await comment
    .save()
    .then((res) => res.populate('postedBy').populate('votes').execPopulate());

  return response;
};

const comment = async (_, args) => {
  const { parentID } = args;

  const comments = await Comment.find({ repliedTo: parentID })
    .populate('postedBy')
    .populate('votes')
    .exec();

  return comments;
};

const deleteComment = async (_, args, context, __) => {
  const { id } = args;

  const token = getToken(context.token);
  const { user } = getUser(token);

  const comment = await Comment.findById(id).populate('postedBy');

  if (comment.postedBy.password === user.password) {
    const response = await comment.deleteOne();
    await Comment.deleteMany({ repliedTo: id });

    return response;
  }

  return new ForbiddenError('User not authorized!');
};

module.exports = { postComment, comment, deleteComment };
