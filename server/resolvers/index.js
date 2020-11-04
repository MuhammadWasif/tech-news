const { createUser, user, login } = require('./users.resolver');
const { createLink, links } = require('./links.resolver');
const { postComment, comment, deleteComment } = require('./comments.resolver');
const { upvoteLink, upvoteComment } = require('./upvote.resolver');

module.exports = {
  Query: {
    message: () => 'Server is running!',
    user,
    links,
    comment,
  },
  Mutation: {
    createUser,
    createLink,
    login,
    postComment,
    deleteComment,
    upvoteLink,
    upvoteComment,
  },
};