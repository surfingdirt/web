/* eslint-disable no-undef */

import { loadableReady } from '@loadable/component';
import { createBrowserHistory } from 'history';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { hydrate } from 'react-dom';
import { Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import apolloClient from '../src/apollo';
import App from '../src/App';
import { AppContextValueObject } from '../src/contexts';

const history = createBrowserHistory();

history.listen(() => {
  window.scrollTo(0, 0);
});

loadableReady(() => {
  const {
    graphql,
    locale,
    login: {
      data: { accessToken },
    },
  } = window.staticAppContextValues;
  const helmetContext = {};
  const apolloClientInstance = apolloClient(graphql, locale, false, accessToken);
  hydrate(
    <HelmetProvider context={helmetContext}>
      <ApolloProvider client={apolloClientInstance}>
        <Router history={history}>
          <App
            appContextValueObject={
              new AppContextValueObject({
                ...staticAppContextValues,
                SSR: false,
                screenWidth: window.innerWidth,
              })
            }
          />
        </Router>
      </ApolloProvider>
    </HelmetProvider>,
    document.getElementById('app_root'),
  );
});
