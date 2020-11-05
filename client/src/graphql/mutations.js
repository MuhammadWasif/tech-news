import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const SIGNUP = gql`
  mutation Signup($username: String!, $password: String!, $email: String!) {
    createUser(username: $username, password: $password, email: $email) {
      token
    }
  }
`;

const CREATE_LINK = gql`
  mutation CreateLink($description: String!, $url: String!) {
    createLink(description: $description, url: $url) {
      id
      postedBy {
        username
      }
    }
  }
`;

export { LOGIN, SIGNUP, CREATE_LINK };
