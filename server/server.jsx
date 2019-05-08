/* eslint-disable */

import Loadable from '@7rulnik/react-loadable';
import { getBundles } from '@7rulnik/react-loadable/webpack';
import cookieParser from 'cookie-parser';
import ejs from 'ejs';
import express from 'express';
import fs from 'fs';
import { po } from 'gettext-parser';
import path from 'path';
import React from 'react';
import { ApolloProvider, getMarkupFromTree } from 'react-apollo';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import { StaticRouter } from 'react-router';

import stats from '../dist/react-loadable.json';
import apolloClient from '../src/apollo';
import App from '../src/App';
import contexts from '../src/contexts';
import Favicon from '../src/images/favicon.png';
import { generateMediaQueries } from '../src/utils/styleUtils';
import { index, port} from '../config/index';

import Logger from './logger';
import utils from './utils';

// noinspection JSUnusedLocalSymbols
const { AppContext, AppContextValueObject } = contexts;

const rootDir = path.resolve(__dirname, '..');

const app = express();

app.use(cookieParser());

const ERROR_500_PAGES = {
  ar: fs.readFileSync(`${rootDir}/src/pages/Page500/ar.html`, 'utf8'),
  en: fs.readFileSync(`${rootDir}/src/pages/Page500/en.html`, 'utf8'),
  he: fs.readFileSync(`${rootDir}/src/pages/Page500/he.html`, 'utf8'),
};
const REGULAR_PAGE = fs.readFileSync(`${rootDir}/dist/template.html`, 'utf8');

// Use gzipped assets for JS, CSS & HTML
// noinspection JSUnresolvedFunction
app.get('*.(js|css|html|ico|png|jpg|jpeg|gif)', (req, res, next) => {
  const gzipName = `${req.url}.gz`;
  const gzipPath = path.join(rootDir, 'dist', gzipName);
  // Check that zipped asset exists
  if (fs.existsSync(gzipPath)) {
    const ext = req.url.match(/[^.]+$/)[0];
    switch (ext) {
      case 'css':
        res.set('Content-Type', 'text/css');
        break;
      case 'js':
        res.set('Content-Type', 'application/js');
        break;
      case 'png':
        res.set('Content-Type', 'image/png');
        break;
      case 'jpg':
      case 'jpeg':
        res.set('Content-Type', 'image/jpeg');
        break;
      case 'gif':
        res.set('Content-Type', 'image/gif');
        break;
      case 'ico':
      default:
        break;
    }
    req.url = gzipName;
    res.set('Content-Encoding', 'gzip');
  }
  next();
});
app.use(express.static(`${rootDir}/dist`));

if (process.env.NODE_ENV !== 'production') {
  app.use('/storybook', express.static(`${rootDir}/storybook-static`));
}

const VERSION = process.env.VERSION || '';

const screenWidth = undefined;
const SSR = true;
const { graphql, showErrors, sportPlayer, baseUrl } = index;

// Default error page is in English
let error500Page = ERROR_500_PAGES['en'];

app.use(async (req, res, next) => {
  const context = {}; // required
  const modules = new Set();
  let document;

  try {
    let { availableLanguages, language, dir } = utils.getLanguagesAndDirFromRequest(req);

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
      graphql,
      language,
      screenWidth,
      sportPlayer,
      translations,
    };
    const appContextValueObject = new AppContextValueObject(staticAppContextValues);
    const accessToken = req.cookies.accessToken || '';
    appContextValueObject.setAccessToken(accessToken);

    const apolloClientInstance = apolloClient(
      graphql,
      language,
      true,
      accessToken,
    );

    // try {
    //   const data = await apolloClientInstance.query({ query: HOMEPAGE });
    //   res.status(context.status || 200).end(data);
    // } catch (e) {
    //   console.log(e);
    // }
    //
    // return;

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
      apolloState: JSON.stringify(apolloClientInstance.extract()),
      css: ['main.css']
        .concat(styles.map((x) => x.file))
        .map((file) => `<link href="/${file}" rel="stylesheet" type="text/css"/>`)
        .join('\n'),
      dir,
      favicon: `<link rel="shortcut icon" href=${Favicon}>`,
      html,
      inlineStyle: `<style>${generateMediaQueries()}</style>`,
      js: ['main.bundle.js']
        .concat(scripts.map((x) => x.file))
        .map((file) => `<script src="/${file}"></script>`)
        .join('\n'),
      lang: language,
      meta: meta || '',
      robotsMeta,
      script: (helmet && helmet.script && helmet.script.toString()) || '',
      staticAppContextValues: JSON.stringify(appContextValueObject.getValues()),
      title: (helmet && helmet.title && helmet.title.toString()) || '',
      versionTag: VERSION,
    });
  } catch (err) {
    Logger.log(err);
    if (showErrors) {
      console.log('Server-side error:')
      console.log(JSON.stringify(err, null, 2));
      return next(err);
    } else {
      return res.status(500).end(error500Page);
    }
  }

  // Sends the response back to the client
  res.status(context.status || 200).end(document);
});

Loadable.preloadAll()
  .then(() => {
    // Launch frontend server:
    app.listen(port, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log('Something bad happened while starting frontend server.');
        throw err;
      }
      // eslint-disable-next-line no-console
      console.log(`Frontend server is listening on ${index.baseUrl}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log('The following error occurred while running Loadable.preloadAll callback', err);
  });
