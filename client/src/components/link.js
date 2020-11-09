import { GoThumbsup } from 'react-icons/go';

function Link({ index, id, url, description, postedBy, createdAt }) {
  return (
    <div className='link'>
      <div className='link__index'>{index}</div>
      <div className='link__container'>
        <div className='link__container--text'>
          <div className='link__container--text-description'>{description}</div>
          <div className='link__container--text-meta'>
            {createdAt.getTime()} • by <span>{postedBy}</span>
          </div>
        </div>
        <div className='link__container--votes'>
          <GoThumbsup /> {434}
        </div>
      </div>
    </div>
  );
}

export default Link;
