import { useQuery, useSubscription } from '@apollo/client';

import Header from '../components/header';
import Link from '../components/link';
import NewLink from '../components/new-link';
import { LINKS_QUERY } from '../graphql/queries';
import { UPVOTE_LINK_SUB } from '../graphql/subscriptions';

function Home(props) {
  const { data, loading } = useQuery(LINKS_QUERY);
  const { data: subData, error } = useSubscription(UPVOTE_LINK_SUB);

  return (
    <div>
      <Header />
      <div className='home'>
        <div className='home__links'>
          {loading
            ? 'Loading...'
            : data.links
                .map((e, index) => <Link key={e.id} index={index + 1} {...e} />)
                .reverse()}
        </div>
        <div className='home__new'>
          <NewLink />
        </div>
      </div>
    </div>
  );
}

export default Home;
