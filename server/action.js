import actions, { ACTION_PREFIX } from '~/actions';

import { config } from '../config';
import { CREATE_PHOTO } from 'Apollo/mutations/createPhoto.gql';
import { photoRoute } from 'Utils/links';

import MutationRunner from './mutationRunner';

const { PHOTO_NEW } = actions;

const actionInfoMap = {
  [PHOTO_NEW]: { mutation: CREATE_PHOTO, hasFileUpload: true, responseKey: 'createPhoto' },
};

const action = async (req, res, next) => {
  console.log('action!');
  console.log(req.url);
  console.log(req.file);
  console.log(req.body);

  const actionName = req.url.replace(ACTION_PREFIX, '');
  const actionInfo = actionInfoMap[actionName];
  if (!actionInfo) {
    throw new Error(`No info found for action '${actionName}'`);
  }

  const { graphql } = config;
  const accessToken =
    req.cookies.accessToken ||
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTgwMjQ5NDcsInVpZCI6IjYwYmZiOGE3LTU3NTQtNDE4Ni1hY2QyLTQ0YjIwZWYzMjM5OSJ9.KqsWfcz4rE6-f9_uCRE58B_j0AZorBWjGBgx1rXFWNc';
  const runner = new MutationRunner(graphql, accessToken);
  const result = await runner.run(actionInfo, req);

  const { id } = result;
  const url = photoRoute(id);
  return res.redirect(301, url);

  // switch (actionName) {
  //   case PHOTO_NEW:
  //     // TODO: perform graphql call, then forward to another page
  //     try {
  //       const { originalname: filename, mimetype: contentType, size: knownLength } = req.file;
  //       const fileInfo = { filename, contentType, knownLength };
  //       const file = fs.readFileSync(req.file.path);
  //       const result = await fileUpload(graphql, CREATE_PHOTO, req.body, file, fileInfo, accessToken);
  //       console.log('result', JSON.stringify(result, null, 2));
  //       const { id } = result;
  //       const url = photoRoute(id);
  //       return res.redirect(301, url);
  //     } catch (e) {
  //       console.log('Whoops', JSON.stringify(e, null, 2));
  //     }
  //     break;
  //
  //   default:
  //     next(new Error(`Unhandled action '${actionName}'`));
  // }
};

export default action;
