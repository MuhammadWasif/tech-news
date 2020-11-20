import { useContext } from 'react';
import { useSubscription } from '@apollo/client';
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { FaRegNewspaper } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { GlobalContext } from '../context/GlobalState';
import { UPVOTE_LINK_SUB } from '../graphql/subscriptions';
import client from '../graphql';

function Header() {
  const { state, setLoggedInUser } = useContext(GlobalContext);

  const { error } = useSubscription(UPVOTE_LINK_SUB);

  if (error) console.error(error);

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
              client.clearStore();
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
