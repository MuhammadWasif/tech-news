import { useState, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useHistory, Link as Goto } from 'react-router-dom';
import { useSnackbar } from 'react-simple-snackbar';
import moment from 'moment';
import { BiSend } from 'react-icons/bi';
import { AiFillLike, AiOutlineDelete, AiOutlineLike } from 'react-icons/ai';

import Header from '../components/header';
import { SINGLE_LINK_QUERY } from '../graphql/queries';
import {
  POST_COMMENT,
  UPVOTE_COMMENT,
  DELETE_LINK,
} from '../graphql/mutations';
import { GlobalContext } from '../context/GlobalState';

function Link(props) {
  const { state } = useContext(GlobalContext);
  const [message] = useSnackbar({ style: { backgroundColor: '#ea5b0c' } });
  const { loggedInUser } = state;

  const histroy = useHistory();

  const [text, setText] = useState('');

  const { data, loading } = useQuery(SINGLE_LINK_QUERY, {
    variables: { id: props.match.params.id },
    fetchPolicy: 'cache-and-network',
    pollInterval: 500,
  });
  const [
    sendComment,
    { error: errorComment, loading: commentLoading },
  ] = useMutation(POST_COMMENT);
  const [voteComment] = useMutation(UPVOTE_COMMENT);
  const [deleteLink] = useMutation(DELETE_LINK);

  const postComment = async () => {
    if (text.trim() === '') return;

    try {
      let response = await sendComment({
        variables: { text, repliedTo: props.match.params.id },
      });
      setText('');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const upvoteComment = async (id) => {
    try {
      const response = await voteComment({ variables: { id } });
      console.log(response);
    } catch (error) {
      console.log(error);
      message('An error occurred. Please make sure you are logged in');
    }
  };

  const deleteLinkHandler = async (id) => {
    try {
      const response = await deleteLink({ variables: { id } });

      console.log(response);
      histroy.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  if (errorComment) alert('An error occurred while posting comment');
  return (
    <div>
      <Header />
      <div className='single-link'>
        {loading ? (
          'Loading...'
        ) : (
          <>
            <div className='single-link__header'>
              <a href={data.link.url}>
                <h2>{data.link.description}</h2>
              </a>
              <h4>
                posted by{' '}
                <span>
                  <Goto to={`/u/${data.link.postedBy.username}`}>
                    {data.link.postedBy.username}
                  </Goto>
                </span>{' '}
                on {moment(Number(data.link.createdAt)).format('MMM DD, YYYY')}
              </h4>

              {loggedInUser?.id === data.link.postedBy.id ? (
                <div onClick={() => deleteLinkHandler(props.match.params.id)}>
                  <AiOutlineDelete />
                </div>
              ) : null}
            </div>

            <div className='single-link__comments'>
              {data.link.comments.map((comment) => {
                return (
                  <div
                    key={comment.id}
                    className='single-link__comments--comment'
                  >
                    <Goto to={`/u/${comment.postedBy.username}`}>
                      <p>
                        {comment.text} <br />
                        <i>
                          by {comment.postedBy.username} on{' '}
                          {moment(Number(comment.createdAt)).format(
                            'MMM DD, YYYY'
                          )}
                        </i>
                      </p>
                    </Goto>

                    <p>
                      <span onClick={() => upvoteComment(comment.id)}>
                        {comment.votes.filter(
                          (vote) => vote.id === loggedInUser?.id
                        ).length !== 0 ? (
                          <AiFillLike color='#ea5b0c' />
                        ) : (
                          <AiOutlineLike />
                        )}
                      </span>
                      {comment.votes.length}
                    </p>
                  </div>
                );
              })}
            </div>

            {loggedInUser ? (
              <div className='single-link__new'>
                <input
                  type='text'
                  placeholder='Add a comment...'
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <br />
                <button disabled={commentLoading} onClick={postComment}>
                  <BiSend />
                </button>
              </div>
            ) : (
              <i>Login to comment</i>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Link;
