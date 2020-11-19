import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Link as Goto } from 'react-router-dom';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import moment from 'moment';

import { UPVOTE_LINK } from '../graphql/mutations';
import { GlobalContext } from '../context/GlobalState';

function Link({
  index,
  id,
  url,
  description,
  postedBy,
  createdAt,
  votes,
  comments,
}) {
  const { state } = useContext(GlobalContext);
  const { loggedInUser } = state;

  const [upvote, { loading }] = useMutation(UPVOTE_LINK, { variables: { id } });
  const formattedDate = moment(new Date(Number(createdAt))).format(
    'MMM DD, YYYY'
  );
  const likedByUser = votes.filter((vote) => vote.id === loggedInUser?.id);

  return (
    <div className='link'>
      <div className='link__index'>{index}</div>
      <div className='link__container'>
        <div className='link__container--text'>
          <div className='link__container--text-description'>
            <a href={url}>{description}</a>
          </div>
          <div className='link__container--text-meta'>
            {formattedDate} •{' '}
            <Goto to={`/u/${postedBy.username}`}>
              <span>{postedBy.username}</span>
            </Goto>
          </div>
        </div>

        <div className='link__container--details-container'>
          <div
            className='link__container--votes'
            onClick={!loading ? upvote : null}
          >
            {likedByUser.length !== 0 ? (
              <AiFillLike color='#ea5b0c' />
            ) : (
              <AiOutlineLike />
            )}
            <span>{votes.length}</span>
          </div>

          <div className='link__container--comments'>
            <Goto to={`/link/${id}`}>
              <FaRegComment /> <span>{comments.length}</span>
            </Goto>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Link;
