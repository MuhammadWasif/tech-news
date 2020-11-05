import { gql } from '@apollo/client';

const LINKS_QUERY = gql`
  {
    links {
      description
    }
  }
`;

export { LINKS_QUERY };
