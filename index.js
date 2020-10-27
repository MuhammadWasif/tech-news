const { ApolloServer } = require('apollo-server');
require('dotenv').config();
const mongose = require('mongoose');
const { importSchema } = require('graphql-import');
const typeDefs = importSchema('./schema.graphql');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongose.connection.once('open', () => {
  server.listen().then((host) => {
    console.log(`🚀 Server running at ${host.url}`);
  });
});
