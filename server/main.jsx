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

import apolloClient from '~/apollo';
import { AppContextValueObject } from '~/contexts';
import features from '~/features';
import App from '~/App';

import Logger from './logger';
import { SUPPORTED_LOCALES, getLocaleAndDirFromRequest } from './utils';
import { analyticsId, config, fbAppId, title as siteTitle } from '../config';
import contentBaseUrl from '../config/contentBaseUrl';

const statsFile = path.resolve('./dist/loadable-stats.json');
const extractor = new ChunkExtractor({ statsFile });

const Main = (rootDir) => {
  const screenWidth = undefined;
  const SSR = true;
  const { galleryAlbumId, graphql, showErrors, baseUrl } = config;
  // Default error page is in English
  const ERROR_500_PAGES = {
    en: fs.readFileSync(`${rootDir}/src/pages/Page500/en.html`, 'utf8'),
  };
  let error500Page = ERROR_500_PAGES.en;

  const regularPageTemplate = Handlebars.compile(
    fs.readFileSync(`${rootDir}/dist/template.hbs`, 'utf8'),
  );

  return async (req, res, next) => {
    res.set('Content-Type', 'text/html; charset=utf-8');

    const context = {}; // required
    let document;

    const { family } = useragent.parse(req.headers['user-agent']);
    const agentBodyClass = slugify(family, { lower: true });

    try {
      const { locale: requestLocale, dir: requestDir } = getLocaleAndDirFromRequest(req);
      error500Page = ERROR_500_PAGES[requestLocale];

      let translations;
      try {
        const translationsContent = fs.readFileSync(
          path.resolve(rootDir, `./src/translations/${requestLocale}.po`),
          'utf8',
        );
        if (!translationsContent) {
          throw new Error(`Could not find translation file for locale '${requestLocale}'.`);
        }
        translations = po.parse(translationsContent);
      } catch (err) {
        translations = {};
      }

      error500Page = ERROR_500_PAGES[requestLocale];

      const staticAppContextValues = {
        SSR,
        availableLocales: SUPPORTED_LOCALES,
        baseUrl,
        dir: requestDir,
        features,
        galleryAlbumId,
        graphql,
        locale: requestLocale,
        screenWidth,
        title: siteTitle,
        translations,
      };

      const appContextValueObject = new AppContextValueObject(staticAppContextValues);
      const accessToken = req.cookies.accessToken || '';
      appContextValueObject.setAccessToken(accessToken);

      const apolloClientInstance = apolloClient(graphql, requestLocale, true, accessToken);
      const helmetContext = {};

      // noinspection JSUnresolvedFunction
      const WrappedApp = extractor.collectChunks(
        <HelmetProvider context={helmetContext}>
          <ApolloProvider client={apolloClientInstance}>
            <StaticRouter location={req.url} context={context}>
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
        locale: requestLocale,
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

    // Sends the response back to the client
    return res.status(context.status || 200).end(document);
  };
};

export default Main;
