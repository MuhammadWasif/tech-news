const { createUser } = require('./users.resolver');

module.exports = {
  Query: {
    message: () => 'Server is running!',
  },
  Mutation: {
    createUser,
  },
};
