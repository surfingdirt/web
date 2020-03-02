/* eslint-disable no-underscore-dangle, no-console */

import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  defaultDataIdFromObject,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
// Store local data inside the Apollo cache alongside remote data
import { withClientState } from 'apollo-link-state';
import fetch from 'isomorphic-fetch';

import fragmentTypes from '../../fragmentTypes.json';

const apolloClient = (url, locale, ssrMode, accessToken, tracingHeaders) => {
  const cacheOptions = {
    dataIdFromObject: (o) => {
      const { id, __typename } = o;
      const val = id ? `${__typename}-${id}` : defaultDataIdFromObject(o);
      return val;
    },
  };
  if (!fragmentTypes) {
    console.log('Found no fragment type definitions, continuing without fragmentMatcher');
  } else {
    cacheOptions.fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData: fragmentTypes,
    });
  }

  let cache = new InMemoryCache(cacheOptions);
  if (!ssrMode) {
    cache = cache.restore(window.__APOLLO_STATE__);
  }

  const stateLink = withClientState({
    cache,
  });

  const headers = Object.assign({}, tracingHeaders, { 'accept-language': locale });
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
