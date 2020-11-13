import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  loggedInUser: JSON.parse(localStorage.getItem('loggedin_user_tech_news')),
};

const GlobalContext = createContext(initialState);

const Provider = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const setLoggedInUser = (data) => {
    dispatch({ type: 'LOGIN', payload: data });
  };
  return (
    <GlobalContext.Provider
      value={{
        state,
        setLoggedInUser,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export { Provider, GlobalContext };
