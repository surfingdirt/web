/* eslint-disable no-undef */

import { loadableReady } from '@loadable/component';
import { createBrowserHistory } from 'history';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { hydrate } from 'react-dom';
import { Router } from 'react-router-dom';

import apolloClient from '../src/apollo';
import App from '../src/App';
import { AppContextValueObject } from '../src/contexts';

const history = createBrowserHistory();

history.listen(() => {
  window.scrollTo(0, 0);
});

window.main = () => {
  loadableReady(() => {
    const {
      graphql,
      language,
      login: {
        data: { accessToken },
      },
    } = staticAppContextValues;

    const apolloClientInstance = apolloClient(graphql, language, false, accessToken);

    hydrate(
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
      </ApolloProvider>,
      document.getElementById('app_root'),
    );
  });
};
