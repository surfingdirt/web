import Cookies from 'js-cookie';
import React from 'react';
import Login from '~/Login';
import routes from '~/routes';

const { HOME } = routes;
const LoginCookie = Login.COOKIE_NAME;
const signupDestinationKey = 'signUpDestination';

const defaultUser = {
  avatar: null,
  cover: null,
  email: '',
  locale: '',
  userId: null,
  username: '',
  timezone: '',
};

export class AppContextValueObject {
  constructor(values) {
    this.values = {
      SSR: false,
      accountKey: '',
      availableLocales: [],
      baseUrl: '',
      dir: 'ltr',
      facebookAppId: '',
      features: {},
      galleryAlbumId: '',
      graphql: '',
      locale: '',
      login: {
        data: {
          accessToken: null,
          me: { ...defaultUser },
        },
      },
      title: '',
      tracing: {
        traceAllRequests: false,
        traceFields: false,
      },
      translations: {},
      twitterUsername: '',
    };

    Object.keys(values).forEach((key) => {
      if (this.values.hasOwnProperty(key)) {
        this.values[key] = values[key];
      } else {
        throw new Error(`Trying to assign unknown property: ${key}`);
      }
    });

    this.values.login.onSuccess = ({ accessToken, expires }) => {
      Cookies.set(LoginCookie, accessToken, { expires: new Date(expires * 1000) });

      const destination = this.values.login.getOrigin() || HOME;
      this.values.login.clearOrigin();
      window.location = destination;
    };

    this.values.login.onFailure = () => {
      this.resetUser();
    };

    this.values.login.logout = () => {
      Cookies.remove(LoginCookie);
      this.resetUser();
    };

    this.values.login.saveOrigin = () => {
      if (!global.window) {
        // Don't worry about that on the server.
        return;
      }
      sessionStorage.setItem(signupDestinationKey, window.location.pathname);
    };

    this.values.login.clearOrigin = () => {
      if (!global.window) {
        // Don't worry about that on the server.
        return null;
      }
      sessionStorage.removeItem(signupDestinationKey);
    };

    this.values.login.getOrigin = () => {
      if (!global.window) {
        // Don't worry about that on the server.
        return null;
      }
      return sessionStorage.getItem(signupDestinationKey);
    };

    this.values.updateAvatar = (avatar) => {
      // TODO: figure out why this does not cause a re-render of parts that use it
      this.values.login.data.me.avatar = avatar;
    };

    this.values.updateCover = (cover) => {
      // TODO: figure out why this does not cause a re-render of parts that use it
      this.values.login.data.me.cover = cover;
    };
  }

  setAccessToken(accessToken) {
    this.values.login.data.accessToken = accessToken;
  }

  setUser({ avatar, cover, email, locale, status, timezone, userId, username }) {
    this.values.login.data.me = {
      avatar,
      cover,
      email,
      locale,
      status,
      timezone,
      userId,
      username,
    };
  }

  resetUser() {
    this.setUser({ ...defaultUser });
  }

  getValues() {
    return this.values;
  }
}

const AppContext = React.createContext(AppContextValueObject);

export default AppContext;
