import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory, Redirect } from 'react-router-dom';

import Header from '../components/header';
import Loader from '../components/loader';
import { GlobalContext } from '../context/GlobalState';
import { CREATE_LINK } from '../graphql/mutations';

function New(props) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const { state } = useContext(GlobalContext);

  const history = useHistory();

  const [postLink] = useMutation(CREATE_LINK, {
    variables: { description: data.description, url: data.url },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await postLink();
      console.log(data);
      history.push('/');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const { loggedInUser } = state;
  if (!loggedInUser) return <Redirect to={`/auth`} />;

  return (
    <div>
      <Header />
      <div className='new'>
        <h2>Submit a Link</h2>

        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Title'
            name='description'
            onChange={handleChange}
          />
          <input
            type='url'
            placeholder='URL'
            name='url'
            onChange={handleChange}
          />

          <button type='submit'> {loading ? <Loader /> : 'Submit'} </button>
        </form>
      </div>
    </div>
  );
}

export default New;
