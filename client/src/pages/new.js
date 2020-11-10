import { useState } from 'react';
import { useMutation } from '@apollo/client';

import Header from '../components/header';
import { CREATE_LINK } from '../graphql/mutations';

function New(props) {
  const [data, setData] = useState({});

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
    try {
      const { data } = await postLink();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />

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

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default New;
