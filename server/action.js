import actions, { ACTION_PREFIX } from '~/actions';
import { CREATE_PHOTO_MUTATION } from 'Apollo/mutations/createPhoto.gql';
import { LOGIN_MUTATION } from 'Apollo/mutations/loginUser.gql';
import { photoRoute } from 'Utils/links';
import routes from '~/routes';
import Login from '~/Login';
import { config } from '../config';

import MutationRunner from './mutationRunner';

const LoginCookie = Login.COOKIE_NAME;

const { LOGIN, PHOTO_NEW } = actions;
const { HOME } = routes;

const actionInfoMap = {
  [PHOTO_NEW]: {
    mutation: CREATE_PHOTO_MUTATION,
    hasFileUpload: true,
    responseKey: 'createPhoto',
    redirect: { route: photoRoute, selector: 'id' },
  },
  [LOGIN]: {
    mutation: LOGIN_MUTATION,
    hasFileUpload: false,
    responseKey: 'login',
    cb: (res, data) => {
      console.log('Login, got data', data);
      res.cookie(LoginCookie, data.accessToken, { expires: new Date(data.expiresIn * 1000) });
      res.redirect(301, HOME);
    },
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
    if (actionInfo.cb) {
      return actionInfo.cb(res, result);
    }

    return next('Unhandled post-action hook');
  } catch (e) {
    // TODO: look at error handling.
    return next(e);
  }
};

export default action;
