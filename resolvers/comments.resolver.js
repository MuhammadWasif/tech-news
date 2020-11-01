const Comment = require('../models/comment.model');
const Link = require('../models/link.model');
const { getUser, getToken } = require('../helpers/utils');

const postComment = async (_, args, context, __) => {
  const { text, repliedTo } = args;

  const token = getToken(context.token);
  const { user } = getUser(token);

  const comment = new Comment({
    text,
    repliedTo,
    postedBy: user._id,
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

module.exports = { postComment, comment };
