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
        id
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
      url
      description
      createdAt
      postedBy {
        username
      }
      comments {
        id
        text
        createdAt
        votes {
          id
        }
        postedBy {
          id
          username
        }
      }
    }
  }
`;

const USER_QUERY = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      points
      username
      links {
        id
        url
        description
        createdAt
        postedBy {
          username
        }
        votes {
          id
          username
        }
        comments {
          id
        }
      }
    }
  }
`;

const GET_REPLIES = gql`
  query GetReplies($parentID: ID!) {
    comment(parentID: $parentID) {
      text
      repliedTo
      postedBy {
        username
      }
    }
  }
`;

export { LINKS_QUERY, SINGLE_LINK_QUERY, USER_QUERY, GET_REPLIES };
