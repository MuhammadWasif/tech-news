import { gql } from '@apollo/client';

const LINKS_QUERY = gql`
  {
    links {
      id
      url
      description
      createdAt
      postedBy {
        username
      }
      votes {
        username
      }
      comments {
        postedBy {
          username
        }
      }
    }
  }
`;

const SINGLE_LINK_QUERY = gql`
  query GetLink($id: ID!) {
    link(id: $id) {
      description
      postedBy {
        username
      }
    }
  }
`;

const USER_QUERY = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      email
      links {
        description
      }
    }
  }
`;

export { LINKS_QUERY, SINGLE_LINK_QUERY, USER_QUERY };
