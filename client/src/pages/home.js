import { useQuery } from '@apollo/client';

import Header from '../components/header';
import Link from '../components/link';
import NewLink from '../components/new-link';
import { LINKS_QUERY } from '../graphql/queries';

function Home(props) {
  const { data, loading } = useQuery(LINKS_QUERY, { pollInterval: 1500 });

  return (
    <div>
      <Header />
      <div className='home'>
        <div className='home__links'>
          {loading
            ? 'Loading...'
            : data.links.map((e, index) => (
                <Link key={e.id} index={index + 1} {...e} />
              ))}
        </div>
        <div className='home__new'>
          <NewLink />
        </div>
      </div>
    </div>
  );
}

export default Home;
