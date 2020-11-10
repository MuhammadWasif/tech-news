import { useMutation } from '@apollo/client';
import { GoThumbsup } from 'react-icons/go';
import { FaRegComment } from 'react-icons/fa';
import moment from 'moment';

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

  return (
    <div className='link'>
      <div className='link__index'>{index}</div>
      <div className='link__container'>
        <div className='link__container--text'>
          <div className='link__container--text-description'>
            <a href={url}>{description}</a>
          </div>
          <div className='link__container--text-meta'>
            {formattedDate} • by <span>{postedBy.username}</span>
          </div>
        </div>

        <div className='link__container--details-container'>
          <div className='link__container--votes' onClick={upvote}>
            <GoThumbsup /> <span>{votes.length}</span>
          </div>

          <div className='link__container--comments' onClick={upvote}>
            <FaRegComment /> <span>{comments.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Link;
