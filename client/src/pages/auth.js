import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';

import { LOGIN, SIGNUP } from '../graphql/mutations';
import Header from '../components/header';
import { GlobalContext } from '../context/GlobalState';

function Auth(props) {
  const [creds, setCreds] = useState({});
  const { setLoggedInUser, state } = useContext(GlobalContext);

  // mutations
  const [login] = useMutation(LOGIN);
  const [signup] = useMutation(SIGNUP);

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
      const { data } = await login({
        variables: {
          username: creds.username,
          password: creds.password,
        },
      });

      localStorage.setItem('auth_token', data.login.token);
      localStorage.setItem(
        'loggedin_user_tech_news',
        JSON.stringify({
          id: data.login.user.id,
          username: data.login.user.username,
        })
      );
      await setLoggedInUser({
        id: data.login.user.id,
        username: data.login.user.username,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { username, email, password } = creds;
    try {
      const { data } = await signup({
        variables: { username, email, password },
      });

      localStorage.setItem('auth_token', data.login.token);
      localStorage.setItem(
        'loggedin_user_tech_news',
        JSON.stringify({
          id: data.login.user.id,
          username: data.login.user.username,
        })
      );

      await setLoggedInUser({
        id: data.login.user.id,
        username: data.login.user.username,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { loggedInUser } = state;
  if (loggedInUser) return <Redirect to={`/u/${loggedInUser.username}`} />;

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

      <div>
        <h2>Register</h2>
        <form onSubmit={handleSignup}>
          <input type='text' name='username' onChange={handleChange} />
          <input type='email' name='email' onChange={handleChange} />
          <input type='password' name='password' onChange={handleChange} />

          <button type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
