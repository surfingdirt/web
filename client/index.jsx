/* eslint-disable no-undef */

import Loadable from '@7rulnik/react-loadable';
import { createBrowserHistory } from 'history';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import apolloClient from '../src/apollo';
import App from '../src/App';
import contexts from '../src/contexts';

const history = createBrowserHistory();
const { AppContextValueObject } = contexts;

history.listen(() => {
  window.scrollTo(0, 0);
});

window.main = () => {
  Loadable.preloadReady().then(() => {
    const {
      graphql,
      language,
      login: {
        data: { accessToken },
      },
    } = staticAppContextValues;

    const apolloClientInstance = apolloClient(
      graphql,
      language,
      false,
      accessToken,
    );

    ReactDOM.hydrate(
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
