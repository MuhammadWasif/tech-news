const { createUser, user, login } = require('./users.resolver');
const { createLink, links, link, deleteLink } = require('./links.resolver');
const { postComment, comment, deleteComment } = require('./comments.resolver');
const { upvoteLink, upvoteComment } = require('./upvote.resolver');
const { UPVOTE_LINK } = require('../helpers/utils');

module.exports = {
  Query: {
    message: () => 'Server is running!',
    user,
    link,
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
    deleteLink,
  },
  Subscription: {
    upvoteLink: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(UPVOTE_LINK),
    },
  },
};
