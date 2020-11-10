import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const http = createHttpLink({
  uri: 'http://localhost:5000/',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('auth_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(http),
  cache: new InMemoryCache(),
});

export default client;
