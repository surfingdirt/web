import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import multer from 'multer';

import { config } from '../config';
import { getAction, postAction } from './action';
import Assets, { assetsRoute } from './assets';
import Main from './main';

const rootDir = path.resolve(__dirname, '..');

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  // TODO: respond with a proper error page:
  res.status(500).send('An error occurred');
  return null;
};

const app = express();
app.disable('x-powered-by');
app.use(cookieParser());

app.get(assetsRoute, Assets(rootDir));
app.use(express.static(`${rootDir}/dist`));

const uploadActions = ['/actions/avatar/post', '/actions/cover/post', '/actions/photo/post'];
uploadActions.forEach((a) => {
  app.post(a, multer({ dest: 'uploads/' }).single('file'), postAction);
});
app.post('/actions/photo/batch-upload', multer({ dest: 'uploads/' }).array('file'), postAction);
app.get('/actions/*', multer().none(), getAction);
app.post('/actions/*', multer().none(), postAction);

app.use(Main(rootDir));
app.use(errorHandler);

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
