import Header from '../components/header';
import Link from '../components/link';

function Home(props) {
  return (
    <div>
      <Header />
      <div className='home'>
        <Link
          index={1}
          id='fadfasdfweaer'
          description='Thsi is a link'
          url='https://google.com'
          createdAt={new Date()}
          postedBy='wasif'
        />
      </div>
    </div>
  );
}

export default Home;
