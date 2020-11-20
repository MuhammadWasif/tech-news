import { useQuery } from '@apollo/client';
import { USER_QUERY } from '../graphql/queries';

import Header from '../components/header';
import Link from '../components/link';

function User(props) {
  const { data, loading } = useQuery(USER_QUERY, {
    variables: { username: props.match.params.username },
  });

  if (data) console.log(data);

  return (
    <div>
      <Header />

      {loading ? (
        'Loading...'
      ) : (
        <div className='user'>
          <div className='user__meta'>
            <h3>Username: {data.user.username}</h3>
            <h3>Points: {data.user.points}</h3>
            <small>
              <i>Points are calculated by links posted</i>
            </small>
          </div>

          <div className='user__links'>
            {data.user.links.map((e, index) => (
              <Link key={e.id} index={index + 1} {...e} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
