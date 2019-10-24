import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import multer from 'multer';

import { config } from '../config';
import Action from './action';
import Assets, { assetsRoute } from './assets';
import Main from './main';

const rootDir = path.resolve(__dirname, '..');

const app = express();
app.disable('x-powered-by');
app.use(cookieParser());

app.get(assetsRoute, Assets(rootDir));
app.use(express.static(`${rootDir}/dist`));

const postActions = ['/actions/avatar/post', '/actions/cover/post', '/actions/photo/post'];
postActions.forEach((a) => {
  app.post(a, multer({ dest: 'uploads/' }).single('file'), Action);
});
app.post('/actions/photo/batch-upload', multer({ dest: 'uploads/' }).array('file'), Action);
app.post('/actions/*', multer().none(), Action);

if (process.env.NODE_ENV !== 'production') {
  app.use('/storybook', express.static(`${rootDir}/storybook-static`));
}

app.use(Main(rootDir));

// Loadable.preloadAll()
//   .then(() => {
// Launch frontend server:
app.listen(config.port, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log('Something bad happened while starting frontend server.');
    throw err;
  }
  // eslint-disable-next-line no-console
  console.log(`Frontend server is listening on port ${config.port}`);
});
//})
// .catch((err) => {
//   // eslint-disable-next-line no-console
//   console.log('An error occurred during Loadable.preloadAll callback:', err);
// });
