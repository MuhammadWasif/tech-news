import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';

import Header from '../components/header';

function Auth(props) {
  const [creds, setCreds] = useState({});
  const [login] = useMutation(LOGIN, {
    variables: {
      username: creds.username,
      password: creds.password,
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreds({
      ...creds,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login();

      localStorage.setItem('auth_token', data.login.token);
      localStorage.setItem('loggedin_user_tech_news', data.login.user.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type='text' name='username' onChange={handleChange} />
          <input type='password' name='password' onChange={handleChange} />

          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
