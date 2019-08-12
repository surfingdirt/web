/* eslint-disable no-underscore-dangle, no-console */

import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
// Store local data inside the Apollo cache alongside remote data
import { withClientState } from 'apollo-link-state';
import fetch from 'isomorphic-fetch';

import fragmentTypes from '../../fragmentTypes.json';
// Options
import typeDefs from './options';

const apolloClient = (url, language, ssrMode, accessToken) => {
  let cache;

  if (!fragmentTypes) {
    console.log('Found no fragment type definitions, continuing without fragmentMatcher');
    cache = new InMemoryCache();
  } else {
    cache = new InMemoryCache({
      fragmentMatcher: new IntrospectionFragmentMatcher({
        introspectionQueryResultData: fragmentTypes,
      }),
    });
  }

  if (!ssrMode) {
    cache = cache.restore(window.__APOLLO_STATE__);
  }

  const stateLink = withClientState({
    cache,
    typeDefs,
  });

  const headers = { 'accept-language': language };
  if (accessToken) {
    headers.authorization = `Bearer ${accessToken}`;
  }

  const uploadLink = createUploadLink({ uri: url, headers });

  return new ApolloClient({
    link: ApolloLink.from([stateLink, uploadLink]),
    ssrMode,
    cache,
    fetch,
  });
};

export default apolloClient;
