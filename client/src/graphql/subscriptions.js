import { gql } from '@apollo/client';

const UPVOTE_LINK_SUB = gql`
  subscription {
    upvoteLink {
      id
      votes {
        id
      }
    }
  }
`;

export { UPVOTE_LINK_SUB };
