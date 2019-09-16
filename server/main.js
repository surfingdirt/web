// Use gzipped assets for JS, CSS & HTML
// noinspection JSUnresolvedFunction
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import ejs from 'ejs';
import { getBundles } from '@7rulnik/react-loadable/webpack';
import { po } from 'gettext-parser';
import { ApolloProvider, getMarkupFromTree } from 'react-apollo';
import { StaticRouter } from 'react-router';
import Loadable from '@7rulnik/react-loadable';
import slugify from 'slugify';
import useragent from 'useragent';

import Favicon from 'Images/favicon.ico';
import Favicon16 from 'Images/favicon-16x16.png';
import Favicon32 from 'Images/favicon-32x32.png';
import apolloClient from '~/apollo';
import { AppContextValueObject } from '~/contexts';
import App from '~/App';

import stats from '../dist/react-loadable.json';
import Logger from './logger';
import utils from './utils';
import { analyticsId, config, fbAppId, title } from '../config';

const Main = (rootDir) => {
  const screenWidth = undefined;
  const SSR = true;
  const { galleryAlbumId, graphql, showErrors, baseUrl } = config;
  // Default error page is in English
  const ERROR_500_PAGES = {
    en: fs.readFileSync(`${rootDir}/src/pages/Page500/en.html`, 'utf8'),
  };
  let error500Page = ERROR_500_PAGES['en'];

  const REGULAR_PAGE = fs.readFileSync(`${rootDir}/dist/template.html`, 'utf8');

  return async (req, res, next) => {
    res.set('Content-Type', 'text/html; charset=utf-8');

    const context = {}; // required
    const modules = new Set();
    let document;

    const { family } = useragent.parse(req.headers['user-agent']);
    const agentBodyClass = slugify(family, { lower: true });

    try {
      const { availableLanguages, language, dir } = utils.getLanguagesAndDirFromRequest(req);

      let translations;
      try {
        const translationsContent = fs.readFileSync(
          path.resolve(rootDir, `./src/translations/${language}.po`),
          'utf8',
        );
        if (!translationsContent) {
          throw new Error(`Could not find translation file for language '${language}'.`);
        }
        translations = po.parse(translationsContent);
      } catch (err) {
        translations = {};
      }

      error500Page = ERROR_500_PAGES[language];

      const staticAppContextValues = {
        SSR,
        availableLanguages,
        baseUrl,
        dir,
        galleryAlbumId,
        graphql,
        language,
        screenWidth,
        translations,
        title,
      };
      const appContextValueObject = new AppContextValueObject(staticAppContextValues);
      const accessToken = req.cookies.accessToken || '';
      appContextValueObject.setAccessToken(accessToken);

      const apolloClientInstance = apolloClient(graphql, language, true, accessToken);

      // noinspection JSUnresolvedFunction
      const WrappedApp = (
        <Loadable.Capture
          report={(moduleName) => {
            modules.add(moduleName);
          }}
        >
          <ApolloProvider client={apolloClientInstance}>
            <StaticRouter location={req.url} context={context}>
              <App appContextValueObject={appContextValueObject} />
            </StaticRouter>
          </ApolloProvider>
        </Loadable.Capture>
      );

      const html = await getMarkupFromTree({
        tree: WrappedApp,
        renderFunction: renderToString,
      });

      const bundles = getBundles(stats, Array.from(modules));
      const styles = bundles.filter((bundle) => bundle.file.endsWith('.css'));
      const scripts = bundles.filter((bundle) => bundle.file.endsWith('.js'));

      // noinspection JSUnresolvedFunction
      const helmet = Helmet.renderStatic();

      const regex = /\/>/g;
      const meta = helmet.meta.toString().replace(regex, '/>\n');

      const robotsMeta =
        process.env.NODE_ENV === 'production'
          ? ''
          : '<meta name="robots" content="noindex, nofollow">';

      // Inserts the rendered React HTML and assets into our html
      document = ejs.render(REGULAR_PAGE, {
        analyticsId,
        apolloState: JSON.stringify(apolloClientInstance.extract()),
        css: ['main.css']
          .concat(styles.map((x) => x.file))
          .map((file) => `<link href="/${file}" rel="stylesheet" type="text/css"/>`)
          .join('\n'),
        dir,
        favicon: `<link rel="shortcut icon" href=${Favicon}>`,
        favicon16: `<link rel="icon" type="image/png" sizes="16x16" href="${Favicon16}">`,
        favicon32: `<link rel="icon" type="image/png" sizes="32x32" href="${Favicon32}">`,
        fbAppId,
        html,
        inlineStyle: `<style></style>`,
        js:
          // null &&
          ['main.bundle.js']
            .concat(scripts.map((x) => x.file))
            .map((file) => `<script src="/${file}"></script>`)
            .join('\n'),
        lang: language,
        meta: meta || '',
        agentBodyClass,
        robotsMeta,
        script: (helmet && helmet.script && helmet.script.toString()) || '',
        staticAppContextValues: JSON.stringify(appContextValueObject.getValues()),
        title: (helmet && helmet.title && helmet.title.toString()) || '',
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
    res.status(context.status || 200).end(document);
  };
};

export default Main;
