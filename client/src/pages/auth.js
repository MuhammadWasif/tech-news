import React from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP } from '../graphql/mutations';

function Auth(props) {
  const [login, { data, error }] = useMutation(SIGNUP, {
    variables: {
      username: 'john',
      password: '123456',
      email: 'wasif@mail.com',
    },
  });

  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
  }

  React.useEffect(() => {
    login();
  }, []);
  return (
    <div>
      <div>Hello, World from Auth!</div>
    </div>
  );
}

export default Auth;
