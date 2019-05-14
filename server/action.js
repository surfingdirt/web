import fs from 'fs';
import actions, { ACTION_PREFIX } from '~/actions';

import { config } from '../config';
import { CREATE_PHOTO } from 'Apollo/mutations/createPhoto.gql';
import {photoRoute} from 'Utils/links';

import fileUpload from './fileUpload';

const { PHOTO_NEW } = actions;

const action = async (req, res, next) => {
  console.log('action!');
  console.log(req.url);
  console.log(req.file);
  console.log(req.body);

  const { graphql } = config;
  // const accessToken = req.cookies.accessToken || '';
  // const { language } = utils.getLanguagesAndDirFromRequest(req);
  // const apolloClientInstance = apolloClient(graphql, language, true, accessToken);

  const actionName = req.url.replace(ACTION_PREFIX, '');
  switch (actionName) {
    case PHOTO_NEW:
      // TODO: perform graphql call, then forward to another page
      try {
        const { originalname: filename, mimetype: contentType, size: knownLength } = req.file;
        const fileInfo = { filename, contentType, knownLength };
        const file = fs.readFileSync(req.file.path);
        const result = await fileUpload(graphql, req.body, file, fileInfo);

        // const result = await apolloClientInstance.mutate({
        //   mutation: CREATE_PHOTO,
        //   errorPolicy: 'all',
        //   variables: { input: req.body, file },
        // });
        console.log('result', JSON.stringify(result, null, 2));
        const {id} = result;
        const url = photoRoute(id);
        return res.redirect(301, url);
      } catch (e) {
        console.log('Whoops', JSON.stringify(e, null, 2));
      }
      break;

    default:
      next(new Error(`Unhandled action '${actionName}'`));
  }
};

export default action;
