const { createUser, user } = require('./users.resolver');
const { createLink, links } = require('./links.resolver');

module.exports = {
  Query: {
    message: () => 'Server is running!',
    user,
    links,
  },
  Mutation: {
    createUser,
    createLink,
  },
};
