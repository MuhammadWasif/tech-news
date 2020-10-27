const { createUser, user } = require('./users.resolver');

module.exports = {
  Query: {
    message: () => 'Server is running!',
    user,
  },
  Mutation: {
    createUser,
  },
};
