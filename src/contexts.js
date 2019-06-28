import Cookies from 'js-cookie';
import React from 'react';
import Login from '~/Login';
import routes from '~/routes';

const { HOME } = routes;
const LoginCookie = Login.COOKIE_NAME;
const signupDestinationKey = 'signUpDestination';

export class AppContextValueObject {
  constructor(values) {
    this.values = {
      SSR: false,
      accountKey: '',
      availableLanguages: [],
      baseUrl: '',
      dir: 'ltr',
      facebookAppId: '',
      galleryAlbumId: '',
      googleClientId: '',
      twitterUsername: '',
      graphql: '',
      language: '',
      login: {
        data: {
          accessToken: null,
          me: {
            id: null,
            username: '',
            email: '',
            firstname: '',
            lastname: '',
            gender: '',
            birthYear: '',
            country: '',
            phone: '',
            imageUrl: '',
            status: '',
            favoritesTeam: [],
          },
        },
      },
      nowValue: null,
      screenWidth: undefined,
      sportPlayer: { iframe: '', src: '' },
      translations: {},
      title: '',
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
      this.values.login.data = {
        id: null,
        accessToken: null,
        expires: null,
        tokenType: null,
      };
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
      sessionStorage.removeItem(signupDestinationKey);
    };

    this.values.login.getOrigin = () => {
      if (!global.window) {
        // Don't worry about that on the server.
        return null;
      }
      return sessionStorage.getItem(signupDestinationKey);
    };
  }

  setAccessToken(accessToken) {
    this.values.login.data.accessToken = accessToken;
  }

  setUser({ avatar, email, status, userId, username }) {
    this.values.login.data.me = { avatar, email, status, userId, username, };
  }

  resetUser() {
    this.setUser({
      userId: null,
      username: '',
      email: '',
    });
  }

  getValues() {
    return this.values;
  }
}

const AppContext = React.createContext(AppContextValueObject);

export default AppContext;
