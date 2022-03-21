import React from 'react';
import ReactDOM from 'react-dom';
import  ApolloClient  from 'apollo-boost';
import { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from './App';
import { BrowserRouter } from 'react-router-dom';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/",
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App/>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
);