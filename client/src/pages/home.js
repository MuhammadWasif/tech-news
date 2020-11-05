import { useQuery } from '@apollo/client';
import { LINKS_QUERY } from '../graphql/queries';

function Home(props) {
  const { data } = useQuery(LINKS_QUERY);

  console.log(data);
  return (
    <div>
      <div>Hello, World!</div>
    </div>
  );
}

export default Home;
