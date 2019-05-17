import actions, { ACTION_PREFIX } from '~/actions';

import { config } from '../config';
import { CREATE_PHOTO } from 'Apollo/mutations/createPhoto.gql';
import { photoRoute } from 'Utils/links';

import MutationRunner from './mutationRunner';

const { PHOTO_NEW } = actions;

const actionInfoMap = {
  [PHOTO_NEW]: {
    mutation: CREATE_PHOTO,
    hasFileUpload: true,
    responseKey: 'createPhoto',
    redirect: { route: photoRoute, selector: 'id' },
  },
};

const action = async (req, res, next) => {
  const actionName = req.url.replace(ACTION_PREFIX, '');
  const actionInfo = actionInfoMap[actionName];
  if (!actionInfo) {
    throw new Error(`No info found for action '${actionName}'`);
  }

  const { graphql } = config;
  const accessToken =
    req.cookies.accessToken ||
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTgxNTM4NDIsInVpZCI6IjYwYmZiOGE3LTU3NTQtNDE4Ni1hY2QyLTQ0YjIwZWYzMjM5OSJ9.15_FRoHEfLPui1y0jzgZ-7J4K4ofiDXYJ4nEwD9pnY8';
  const runner = new MutationRunner(graphql, accessToken);
  try {
    const result = await runner.run(actionInfo, req);

    if (actionInfo.redirect) {
      const { route, selector } = actionInfo.redirect;
      // TODO: handle more complex selectors:
      const value = result[selector];
      if (!value) {
        return next(`Could not resolve selector '${selector}' on GraphQL response object.`);
      }
      const url = route(value);
      return res.redirect(301, url);
    }

    return next('Unhandled post-action hook');
  } catch (e) {
    // TODO: look at error handling.
    return next(e);
  }
};

export default action;
