// Use gzipped assets for JS, CSS & HTML
// noinspection JSUnresolvedFunction
import { ChunkExtractor } from '@loadable/server';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Handlebars from 'handlebars';
import { HelmetProvider } from 'react-helmet-async';
import { po } from 'gettext-parser';
import { ApolloProvider, getMarkupFromTree } from 'react-apollo';
import { StaticRouter } from 'react-router';
import slugify from 'slugify';
import useragent from 'useragent';

import ME from 'Apollo/queries/me3.gql';
import apolloClient from '~/apollo';
import { AppContextValueObject } from '~/contexts';
import features from '~/features';
import App from '~/App';

import contentBaseUrl from '../config/contentBaseUrl';
import { buildTracer, getTracingHeaders } from '../src/utils/tracing';
import Logger from './logger';
import {
  SUPPORTED_LOCALES,
  getLocaleAndDirFromRequest,
  getLocaleAndDirFromUser,
  getTracingContext,
} from './utils';
import { analyticsId, config, fbAppId, title as siteTitle } from '../config';

const statsFile = path.resolve('./dist/loadable-stats.json');
const extractor = new ChunkExtractor({ statsFile });

const translationFolder = './src/translations';
const localeTranslations = {};
fs.readdirSync(translationFolder)
  .filter((file) => file.substr(-3, 3) === '.po')
  .forEach((file) => {
    const locale = file.substr(0, file.length - 3);
    localeTranslations[locale] = po.parse(fs.readFileSync(`${translationFolder}/${file}`, 'utf8'));
  });

const loggedOutME = {
  data: {
    me: {
      avatar: null,
      bio: null,
      cover: null,
      email: null,
      firstName: null,
      locale: null,
      status: 'guest',
      timezone: null,
      userId: null,
      username: null,
    },
  },
};

const Main = (rootDir) => {
  const SSR = true;
  const { baseUrl, galleryAlbumId, graphql, showErrors, tracing: tracingConfig } = config;
  // Default error page is in English
  const ERROR_500_PAGES = {
    en: fs.readFileSync(`${rootDir}/src/pages/Page500/en.html`, 'utf8'),
  };
  let error500Page = ERROR_500_PAGES.en;

  const regularPageTemplate = Handlebars.compile(
    fs.readFileSync(`${rootDir}/dist/template.hbs`, 'utf8'),
  );

  const tracer = buildTracer(tracingConfig);

  return async (req, res, next) => {
    const tracing = getTracingContext(req, tracingConfig);

    let span;
    if (tracing.traceAllRequests) {
      span = tracer.startSpan(`Node response to ${req.url}`);
    }
    const tracingHeaders = getTracingHeaders(tracing, span ? span.id.traceId : null);

    res.set('Content-Type', 'text/html; charset=utf-8');

    const context = {}; // required
    let document;
    const accessToken = req.cookies.accessToken || '';

    const { family } = useragent.parse(req.headers['user-agent']);
    const agentBodyClass = slugify(family, { lower: true });

    try {
      let { locale, dir } = getLocaleAndDirFromRequest(req);
      error500Page = ERROR_500_PAGES[locale];

      let apolloClientInstance = apolloClient(graphql, locale, true, accessToken, tracingHeaders);
      const meData = accessToken ? await apolloClientInstance.query({ query: ME }) : loggedOutME;
      const {
        data: { me: user },
      } = meData;

      if (user.locale && user.locale !== locale) {
        // Logged-in user has a locale and it's different from the request locale: take that into account
        const userLocaleAndDir = getLocaleAndDirFromUser(user, locale, dir);
        locale = userLocaleAndDir.locale;
        dir = userLocaleAndDir.dir;
        apolloClientInstance = apolloClient(graphql, locale, true, accessToken);
      }

      const translations = localeTranslations[locale];
      const staticAppContextValues = {
        SSR,
        availableLocales: SUPPORTED_LOCALES,
        baseUrl,
        dir,
        features,
        galleryAlbumId,
        graphql,
        locale,
        title: siteTitle,
        tracing,
        translations,
      };

      const appContextValueObject = new AppContextValueObject(staticAppContextValues);
      appContextValueObject.setAccessToken(accessToken);
      if (user) {
        appContextValueObject.setUser(user);
      }
      const helmetContext = {};

      // noinspection JSUnresolvedFunction
      const WrappedApp = extractor.collectChunks(
        <HelmetProvider context={helmetContext}>
          <ApolloProvider client={apolloClientInstance}>
            <StaticRouter location={req.url} context={context}>
              {/* TODO: create a new component and do the ME query in a non-blocking way */}
              <App appContextValueObject={appContextValueObject} />
            </StaticRouter>
          </ApolloProvider>
        </HelmetProvider>,
      );

      const html = await getMarkupFromTree({
        tree: WrappedApp,
        renderFunction: renderToString,
      });
      const css = extractor.getStyleTags();
      const js = extractor.getScriptTags();
      const {
        helmet: { htmlAttributes, meta, title },
      } = helmetContext;

      // Inserts the rendered React HTML and assets into our html
      document = regularPageTemplate({
        agentBodyClass,
        analyticsId,
        apolloState: JSON.stringify(apolloClientInstance.extract()),
        baseUrl: contentBaseUrl,
        css,
        fbAppId,
        html,
        htmlAttributes: htmlAttributes.toString(),
        inlineStyle: '',
        locale,
        js,
        meta: meta.toString(),
        staticAppContextValues: JSON.stringify(appContextValueObject.getValues()),
        title: title.toString(),
      });
    } catch (err) {
      Logger.log(err);
      if (showErrors) {
        console.log('Server-side error:');
        console.log(JSON.stringify(err, null, 2));
        return next(err);
      }
      return res.status(500).end(error500Page);
    }

    // Server-side redirects are caught here and applied:
    const { action, url: redirectUrl } = context;
    if (action === 'REPLACE' && redirectUrl) {
      return res.redirect(301, redirectUrl);
    }

    if (tracing.traceAllRequests) {
      span.finish();
    }

    // Sends the response back to the client
    return res.status(context.status || 200).end(document);
  };
};

export default Main;
