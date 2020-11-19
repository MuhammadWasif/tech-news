import { useContext } from 'react';
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { FaRegNewspaper } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { GlobalContext } from '../context/GlobalState';

function Header() {
  const { state, setLoggedInUser } = useContext(GlobalContext);
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
        {state.loggedInUser ? (
          <button
            onClick={async () => {
              localStorage.clear();
              await setLoggedInUser(null);
            }}
          >
            <AiOutlineLogout style={{ marginRight: 4 }} /> Logout
          </button>
        ) : null}
        <Link to={`/auth`}>
          <AiOutlineUser />
        </Link>
      </div>
    </div>
  );
}

export default Header;
