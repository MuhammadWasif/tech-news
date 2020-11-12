import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
      }
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

const UPVOTE_LINK = gql`
  mutation UpvoteLink($id: ID!) {
    upvoteLink(id: $id) {
      id
    }
  }
`;

const POST_COMMENT = gql`
  mutation PostComment($text: String!, $repliedTo: ID!) {
    postComment(text: $text, repliedTo: $repliedTo) {
      id
    }
  }
`;

const UPVOTE_COMMENT = gql`
  mutation UpvoteComment($id: ID!) {
    upvoteComment(id: $id) {
      id
    }
  }
`;

export {
  LOGIN,
  SIGNUP,
  CREATE_LINK,
  UPVOTE_LINK,
  POST_COMMENT,
  UPVOTE_COMMENT,
};
