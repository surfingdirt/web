/* eslint-disable */

import Loadable from '@7rulnik/react-loadable';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import multer from 'multer';

import { index, port } from '../config/index';

import Action from './action';
import Assets, { assetsRoute } from './assets';
import Main from './main';

const rootDir = path.resolve(__dirname, '..');

const app = express();
app.use(cookieParser());

app.get(assetsRoute, Assets(rootDir));
app.use(express.static(`${rootDir}/dist`));

app.post('/actions/*', multer({ dest: 'uploads/' }).single('file'), Action);

if (process.env.NODE_ENV !== 'production') {
  app.use('/storybook', express.static(`${rootDir}/storybook-static`));
}

app.use(Main(rootDir));

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
    console.log('The following error occurred while running Loadable.preloadAll callback:', err);
  });
