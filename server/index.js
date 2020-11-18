const { ApolloServer, PubSub } = require('apollo-server');
require('dotenv').config();
const mongoose = require('mongoose');
const { importSchema } = require('graphql-import');
const typeDefs = importSchema('./schema.graphql');
const resolvers = require('./resolvers');
const { getToken } = require('./helpers/utils');

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) return { ...connection.context, pubsub };

    const token = req.headers.authorization || '';

    return { token: getToken(token), pubsub };
  },
  subscriptions: {
    onConnect: (params) => {
      if (params.Authorization) {
        const token = getToken(params.Authorization);

        return { token };
      }
      throw new Error('Mising auth token!');
    },
  },
});

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.once('open', () => {
  server.listen({ port: process.env.PORT || 4000 }).then((host) => {
    console.log(`🚀 Server running at ${host.url}`);
  });
});
