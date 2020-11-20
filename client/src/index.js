import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import client from './graphql';
import { Provider } from './context/GlobalState';
import SnackbarProvider from 'react-simple-snackbar';

ReactDOM.render(
  <Provider>
    <ApolloProvider client={client}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
