import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Redirect, useHistory } from 'react-router-dom';

import { LOGIN, SIGNUP } from '../graphql/mutations';
import Header from '../components/header';
import Loader from '../components/loader';
import { GlobalContext } from '../context/GlobalState';

function Auth(props) {
  const [creds, setCreds] = useState({});
  const [page, setPage] = useState('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setLoggedInUser, state } = useContext(GlobalContext);

  // mutations
  const [login] = useMutation(LOGIN);
  const [signup] = useMutation(SIGNUP);

  const history = useHistory();

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
      setLoading(true);
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

      history.push('/');
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { username, email, password } = creds;
    try {
      setLoading(true);
      const { data } = await signup({
        variables: { username, email, password },
      });
      console.log(data);
      localStorage.setItem('auth_token', data.createUser.token);
      localStorage.setItem(
        'loggedin_user_tech_news',
        JSON.stringify({
          id: data.createUser.user.id,
          username: data.createUser.user.username,
        })
      );

      await setLoggedInUser({
        id: data.createUser.user.id,
        username: data.createUser.user.username,
      });
      history.push('/');
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  const activeStyles = {
    backgroundColor: '#ea5b0c',
    color: 'white',
    boxShadow: 'none',
  };

  const { loggedInUser } = state;
  if (loggedInUser) return <Redirect to={`/u/${loggedInUser.username}`} />;

  return (
    <div>
      <Header />

      <div className='auth'>
        <div className='auth__btn-group'>
          <button
            className='auth__btn-group--btn'
            style={page === 'login' ? activeStyles : {}}
            onClick={() => setPage('login')}
          >
            Login
          </button>
          <button
            className='auth__btn-group--btn'
            style={page === 'register' ? activeStyles : {}}
            onClick={() => setPage('register')}
          >
            Register
          </button>
        </div>

        {page === 'login' ? (
          <div className='auth__login'>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type='text'
                name='username'
                placeholder='Username'
                onChange={handleChange}
                required
              />
              <input
                type='password'
                name='password'
                placeholder='Password'
                onChange={handleChange}
                required
              />

              <button type='submit' disabled={loading}>
                {loading ? <Loader /> : 'Login'}
              </button>
              {error ? (
                <p>
                  <b>Error: </b>
                  {error}
                </p>
              ) : null}
            </form>
          </div>
        ) : (
          <div>
            <h2>Register</h2>
            <form onSubmit={handleSignup}>
              <input
                type='text'
                name='username'
                placeholder='Username'
                onChange={handleChange}
                required
                pattern='[^\s]+'
              />
              <input
                type='password'
                name='password'
                placeholder='Password'
                onChange={handleChange}
                required
                minLength={6}
              />
              <input
                type='email'
                name='email'
                placeholder='E-mail'
                onChange={handleChange}
                required
              />

              <button type='submit' disabled={loading}>
                {loading ? <Loader /> : 'Sign Up'}
              </button>

              {error ? (
                <p>
                  <b>Error: </b>
                  {error}
                </p>
              ) : null}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Auth;
