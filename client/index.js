import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import Routes from './routes';

const client = new ApolloClient({
  link: createHttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache().restore(window.__INITIAL_STATE__),
});
const component = (
  <ApolloProvider client={client} key="provider">
    <Routes />
  </ApolloProvider>
);
render(component, document.getElementById('root'));
