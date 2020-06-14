import { addDecorator, configure } from '@storybook/react';
import { po } from 'gettext-parser';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import SvgSymbols from 'Components/Widgets/SvgSymbols';
import AppContext, { AppContextValueObject } from '~/contexts';
import '~/main.scss';

import apolloClient from '../src/apollo';
import { getTracingHeaders } from '../src/utils/tracing';

const translations = po.parse(`
  "Content-Type: text/plain; charset=UTF-8\\n"
  "Project-Id-Version: \\n"
  "POT-Creation-Date: \\n"
  "PO-Revision-Date: \\n"
  "Language-Team: \\n"
  "MIME-Version: 1.0\\n"
  "Content-Transfer-Encoding: 8bit\\n"
  "X-Generator: Poedit 2.2.1\\n"
  "Last-Translator: \\n"
  "Language: En\\n"
`);

const history = createBrowserHistory();

const graphql = 'http://localhost:4000';
const locale = 'en';
const accessToken = null;
const tracingHeaders = getTracingHeaders({ traceAllRequests: false, traceFields: false });

const apolloClientInstance = apolloClient(graphql, locale, false, accessToken, tracingHeaders);

const staticAppContextValues = { availableLocales: ['en'], locale, translations };
const appContextValueObject = new AppContextValueObject({
  ...staticAppContextValues,
  SSR: false,
});
const contextValue = appContextValueObject.getValues();

const ContextDecorator = (storyFn) => (
  <ApolloProvider client={apolloClientInstance}>
    <Router history={history}>
      <AppContext.Provider value={contextValue}>
        <SvgSymbols />
        {storyFn()}
      </AppContext.Provider>
    </Router>
  </ApolloProvider>
);

const req = require.context('../stories', false, /\.\/.*.stories.js?$/);

addDecorator(ContextDecorator);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
