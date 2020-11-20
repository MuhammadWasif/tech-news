import Header from '../components/header';
import Image404 from '../assets/images/404.svg.js';

function NotFound() {
  return (
    <div>
      <Header />
      <center>
        <h2 style={{ fontFamily: 'Noto Sans JP' }}>
          The page you are looking for does not exist
        </h2>
        <div style={{ width: '40%' }}>
          <Image404 />
        </div>
      </center>
    </div>
  );
}
export default NotFound;
