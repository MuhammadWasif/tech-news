const { ApolloServer } = require('apollo-server');
require('dotenv').config();
const mongoose = require('mongoose');
const { importSchema } = require('graphql-import');
const typeDefs = importSchema('./schema.graphql');
const resolvers = require('./resolvers');
const { getToken } = require('./helpers/utils');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';

    return { token: getToken(token) };
  },
});

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.once('open', () => {
  server.listen().then((host) => {
    console.log(`🚀 Server running at ${host.url}`);
  });
});
