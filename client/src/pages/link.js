import { useState, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import moment from 'moment';
import { BiSend, BiLike } from 'react-icons/bi';
import { AiFillLike } from 'react-icons/ai';

import Header from '../components/header';
import { SINGLE_LINK_QUERY } from '../graphql/queries';
import { POST_COMMENT, UPVOTE_COMMENT } from '../graphql/mutations';
import { GlobalContext } from '../context/GlobalState';

function Link(props) {
  const { state } = useContext(GlobalContext);
  const { loggedInUser } = state;

  const [text, setText] = useState('');

  const { data, loading, error } = useQuery(SINGLE_LINK_QUERY, {
    variables: { id: props.match.params.id },
    fetchPolicy: 'cache-and-network',
  });
  const [
    sendComment,
    { error: errorComment, loading: commentLoading },
  ] = useMutation(POST_COMMENT);
  const [voteComment, { error: voteCommentError }] = useMutation(
    UPVOTE_COMMENT
  );

  if (error) {
    console.log(error);
  }

  const postComment = async () => {
    if (text.trim() === '') return;

    try {
      let response = await sendComment({
        variables: { text, repliedTo: props.match.params.id },
      });

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
    }
  };

  if (errorComment) alert('An error occurred while posting comment');
  return (
    <div>
      <Header />
      <div>
        {loading ? (
          'Loading...'
        ) : (
          <>
            <div>
              <a href={data.link.url}>
                <h2>{data.link.description}</h2>
              </a>
              <h4>
                posted by {data.link.postedBy.username} on{' '}
                {moment(Number(data.link.createdAt)).format('MMM DD, YYYY')}
              </h4>
            </div>

            <div>
              {data.link.comments.map((comment) => {
                return (
                  <>
                    <p key={comment.id}>
                      <span onClick={() => upvoteComment(comment.id)}>
                        {comment.votes.filter(
                          (vote) => vote.id === loggedInUser?.id
                        ).length !== 0 ? (
                          <span>
                            <AiFillLike /> ({comment.votes.length})
                          </span>
                        ) : (
                          <span>
                            <BiLike />({comment.votes.length})
                          </span>
                        )}{' '}
                      </span>
                      {comment.text} • by {comment.postedBy.username}
                    </p>
                  </>
                );
              })}
            </div>

            <div>
              <input
                type='text'
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <br />
              <button disabled={commentLoading} onClick={postComment}>
                <BiSend />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Link;
