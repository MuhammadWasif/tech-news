import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';

const token = localStorage.getItem('auth_token');
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const http = createHttpLink({
  uri: 'http://localhost:5000/',
});

const ws = new WebSocketLink({
  uri: `ws://localhost:5000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);

    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  ws,
  authLink.concat(http)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
