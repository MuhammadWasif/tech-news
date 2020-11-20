import { useQuery } from '@apollo/client';
import { USER_QUERY } from '../graphql/queries';

import Header from '../components/header';
import Loader from '../components/loader';
import Link from '../components/link';
import { Redirect } from 'react-router-dom';

function User(props) {
  const { data, loading } = useQuery(USER_QUERY, {
    variables: { username: props.match.params.username },
  });

  if (data && !data.user) return <Redirect to='/404' />;

  return (
    <div>
      <Header />

      {loading ? (
        <div className='user__loader'>
          <Loader />
        </div>
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
