import { useMutation } from '@apollo/client';
import { Link as Goto } from 'react-router-dom';
import { BiLike } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import moment from 'moment';

import { loggedInUser } from '../utils';
import { UPVOTE_LINK } from '../graphql/mutations';

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
  const [upvote] = useMutation(UPVOTE_LINK, { variables: { id } });
  const formattedDate = moment(new Date(Number(createdAt))).format(
    'MMM DD, YYYY'
  );
  const likedByUser = votes.filter((vote) => vote.id === loggedInUser);

  return (
    <div className='link'>
      <div className='link__index'>{index}</div>
      <div className='link__container'>
        <div className='link__container--text'>
          <div className='link__container--text-description'>
            <a href={url}>{description}</a>
          </div>
          <div className='link__container--text-meta'>
            {formattedDate} • <span>{postedBy.username}</span>
          </div>
        </div>

        <div className='link__container--details-container'>
          <div className='link__container--votes' onClick={upvote}>
            {likedByUser.length !== 0 ? <AiFillLike /> : <BiLike />}
            <span>{votes.length}</span>
          </div>

          <div className='link__container--comments' onClick={upvote}>
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
