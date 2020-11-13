import { useContext } from 'react';
import { useQuery } from '@apollo/client';

import Header from '../components/header';
import Link from '../components/link';
import NewLink from '../components/new-link';
import { LINKS_QUERY } from '../graphql/queries';
import { GlobalContext } from '../context/GlobalState';

function Home(props) {
  const { state } = useContext(GlobalContext);

  console.log(state);
  const { data, loading } = useQuery(LINKS_QUERY, {
    fetchPolicy: 'cache-and-network',
  });

  return (
    <div>
      <Header />
      <div className='home'>
        {loading
          ? 'Loading...'
          : data.links
              .map((e, index) => <Link key={e.id} index={index + 1} {...e} />)
              .reverse()}
      </div>

      <NewLink />
    </div>
  );
}

export default Home;
