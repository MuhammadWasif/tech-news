import { useQuery } from '@apollo/client';
import { USER_QUERY } from '../graphql/queries';

function User(props) {
  const { data } = useQuery(USER_QUERY, {
    variables: { username: props.match.params.username },
  });
  console.log(data);
  return (
    <div>
      <div>Hello, World from User Page!</div>
    </div>
  );
}

export default User;
