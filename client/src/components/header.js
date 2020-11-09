import { AiOutlineUser } from 'react-icons/ai';
import { FaRegNewspaper } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='header'>
      <Link to='/'>
        <div className='header__title'>
          <h3 className='header__title--icon'>
            <FaRegNewspaper />
          </h3>
          <h3>Tech News</h3>
        </div>
      </Link>

      <div className='header__profile'>
        <Link to={`/u/wasif`}>
          <AiOutlineUser />
        </Link>
      </div>
    </div>
  );
}

export default Header;
