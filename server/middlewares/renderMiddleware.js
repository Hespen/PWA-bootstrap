import React from 'react';
import Helmet from 'react-helmet';
import fetch from 'isomorphic-fetch';
import {renderToString} from 'react-dom/server';
import {matchPath, Route, StaticRouter} from 'react-router';
import {ApolloProvider, getDataFromTree} from 'react-apollo';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import {createLocalInterface} from 'apollo-local-query';
import {execute} from 'graphql';
import {routeArray} from '../../client/routes';
import html from '../render/html';
import schema from '../graphql/';

const PWA_SSR = process.env.PWA_SSR === 'true';

const serverRenderedChunks = async (req, res, renderProps) => {
  const route = renderProps;
  const networkInterface = createLocalInterface({execute}, schema, {context: {req}});
  console.log(req.get('Host'));
  const client = new ApolloClient({
    ssrMode: true,
    shouldBatch: true,
    networkInterface,
    link: createHttpLink({ uri: `${process.env.BASE_URL || 'http://localhost:1337'}/graphql`, fetch }),
    cache: new InMemoryCache(),
  });
  res.set('Content-Type', 'text/html');

  const earlyChunk = html.earlyChunk(route);
  res.write(earlyChunk);
  res.flush();

  const component =
    <ApolloProvider client={client} key="provider">
      <StaticRouter >
        <Route {...renderProps} />
      </StaticRouter>
    </ApolloProvider>
  ;

  if (PWA_SSR) {
    getDataFromTree(component).then(() => {
        const lateChunk = html.lateChunk(
          renderToString(component),
          Helmet.renderStatic(),
          client.cache.extract(),
          route,
        );
        res.end(lateChunk);
      }
    ).catch((e)=>{
      console.log(e);
    })
  } else {
    const lateChunk = html.lateChunk(
      '',
      Helmet.renderStatic(),
      client.getInitialState(),
      route,
    );
    res.end(lateChunk);
  }
};

export default (req, res) => {
  const mapper = routeArray.map((elem) => matchPath(req.url, elem));
  const match = mapper.find(e => e);
  const matchedComponent = routeArray.find((route) => {
    return route.path === match.path && route;
  });
  return serverRenderedChunks(req, res, matchedComponent);
};
