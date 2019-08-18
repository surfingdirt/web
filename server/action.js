import actions, { ACTION_PREFIX } from '~/actions';
import { CREATE_ALBUM_MUTATION } from 'Apollo/mutations/createAlbum2.gql';
import { CREATE_PHOTO_MUTATION } from 'Apollo/mutations/createPhoto.gql';
import { CREATE_VIDEO_MUTATION } from 'Apollo/mutations/createVideo2.gql';
import { UPDATE_AVATAR_MUTATION } from 'Apollo/mutations/updateAvatar.gql';
import { UPDATE_COVER_MUTATION } from 'Apollo/mutations/updateCover2.gql';
import { LOGIN_MUTATION } from 'Apollo/mutations/login.gql';
import { LOGOUT_MUTATION } from 'Apollo/mutations/logout.gql';
import { albumRoute, errorRoute, photoRoute, videoRoute } from 'Utils/links';
import routes from '~/routes';
import Login from '~/Login';
import { config } from '../config';

import MutationRunner from './mutationRunner';

const LoginCookie = Login.COOKIE_NAME;

const { ALBUM_NEW, AVATAR_UPDATE, COVER_UPDATE, LOGIN, LOGOUT, PHOTO_NEW, VIDEO_NEW, } = actions;
const { ERROR, HOME, PROFILE } = routes;

const actionInfoMap = {
  [ALBUM_NEW]: {
    mutation: CREATE_ALBUM_MUTATION,
    hasFileUpload: false,
    responseKey: 'createAlbum',
    redirect: { route: albumRoute, selector: 'id' },
    onError: (error, res) => {
      console.error('Album creation error:', error);
      if (error.code) {
        return res.redirect(301, errorRoute(error.code, error.message));
      }
      return res.redirect(500, ERROR);
    },
  },
  [AVATAR_UPDATE]: {
    mutation: UPDATE_AVATAR_MUTATION,
    hasFileUpload: true,
    responseKey: 'updateAvatar',
    redirect: { route: PROFILE },
    onError: (error, res) => {
      console.error('Avatar update error:', error);
      return res.redirect(301, errorRoute(error.code, error.message));
    },
  },
  [COVER_UPDATE]: {
    mutation: UPDATE_COVER_MUTATION,
    hasFileUpload: true,
    responseKey: 'updateCover',
    redirect: { route: PROFILE },
    onError: (error, res) => {
      console.error('Cover update error:', error);
      return res.redirect(301, errorRoute(error.code, error.message));
    },
  },
  [PHOTO_NEW]: {
    mutation: CREATE_PHOTO_MUTATION,
    hasFileUpload: true,
    responseKey: 'createPhoto',
    redirect: { route: photoRoute, selector: 'id' },
    onError: (error, res) => {
      console.error('Photo upload error:', error);
      if (error.code) {
        return res.redirect(301, errorRoute(error.code, error.message));
      }
      return res.redirect(500, ERROR);
    },
  },
  [VIDEO_NEW]: {
    mutation: CREATE_VIDEO_MUTATION,
    hasFileUpload: false,
    responseKey: 'createVideo',
    redirect: { route: videoRoute, selector: 'id' },
    onError: (error, res) => {
      console.error('Video upload error:', error);
      if (error.code) {
        return res.redirect(301, errorRoute(error.code, error.message));
      }
      return res.redirect(500, ERROR);
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
    onError: (error, res) => {
      console.error('Login error:', error);
      return res.redirect(301, errorRoute(error.code, error.message));
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
    onError: (error, res) => {
      console.error('Logout error:', error);
      return res.redirect(301, errorRoute(error.code, error.message));
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
      let url = route;
      if (selector) {
        const value = result[selector];
        if (!value) {
          return next(`Could not resolve selector '${selector}' on GraphQL response object.`);
        }
        url = route(value);
      }
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
