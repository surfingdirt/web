import actions, { ACTION_PREFIX } from '~/actions';
import { CREATE_PHOTO_MUTATION } from 'Apollo/mutations/createPhoto.gql';
import { LOGIN_MUTATION } from 'Apollo/mutations/login.gql';
import { LOGOUT_MUTATION } from 'Apollo/mutations/logout.gql';
import { errorRoute, photoRoute } from 'Utils/links';
import routes from '~/routes';
import Login from '~/Login';
import { config } from '../config';

import MutationRunner from './mutationRunner';

const LoginCookie = Login.COOKIE_NAME;

const { LOGIN, LOGOUT, PHOTO_NEW } = actions;
const { HOME } = routes;

const actionInfoMap = {
  [PHOTO_NEW]: {
    mutation: CREATE_PHOTO_MUTATION,
    hasFileUpload: true,
    responseKey: 'createPhoto',
    redirect: { route: photoRoute, selector: 'id' },
    onError: (error, res, next) => {
      // TODO: handle photo upload errors
    },
  },
  [LOGIN]: {
    mutation: LOGIN_MUTATION,
    hasFileUpload: false,
    responseKey: 'login',
    cb: (res, data) => {
      res.cookie(LoginCookie, data.accessToken, { expires: new Date(data.expiresIn * 1000) });
      res.redirect(301, HOME);
    },
  },
  [LOGOUT]: {
    mutation: LOGOUT_MUTATION,
    hasFileUpload: false,
    responseKey: 'logout',
    cb: (res) => {
      res.clearCookie(LoginCookie);
      res.redirect(301, HOME);
    },
    onError: (error, res, next) => {
      // TODO: handle logout errors
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
  const { accessToken } = req.cookies;
  const runner = new MutationRunner(graphql, accessToken);
  let result;
  try {
    result = await runner.run(actionInfo, req);
  } catch (error) {
    if (actionInfo.onError) {
      return actionInfo.onError(error, res, next);
    }
    return res.redirect(301, errorRoute(error.code, error.message));
  }

  try {
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
  } catch (e) {
    // TODO: look at error handling.
    return next(e);
  }

  return next('Unhandled post-action hook');
};

export default action;
