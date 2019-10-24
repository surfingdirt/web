import loadable from '@loadable/component';
import Loadable from '@7rulnik/react-loadable';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { Route, Switch } from 'react-router';

import ME from 'Apollo/queries/me.gql';
import { FORBIDDEN, MANDATORY } from 'Components/EnforceLogin';
import ErrorMessage from 'Components/ErrorMessage';
import loading from 'Components/Loading';
import { DefaultLayoutRoute } from 'Components/Route';
import Spinner from 'Components/Spinner';
import { Page404 } from 'Pages/Page404';

import AppContext, { AppContextValueObject } from '~/contexts';

import '~/main.scss';
import routes from '~/routes';

const {
  ABOUT,
  ALBUM,
  ALBUM_NEW,
  ALBUMS,
  CONFIRM_EMAIL,
  ERROR,
  HOME,
  LOGIN,
  OLD_FORUM,
  PHOTO,
  PHOTO_BATCH_UPLOAD_FOR_ALBUM,
  PHOTO_NEW,
  PHOTO_NEW_FOR_ALBUM,
  PROFILE,
  USER,
  USERS,
  VIDEO,
  VIDEO_NEW,
  VIDEO_NEW_FOR_ALBUM,
} = routes;

const Test = loadable(
  () => import(/* webpackChunkName: 'Test' */ './pages/Test').then((m) => m.Test),
  { fallback: loading },
);
const About = loadable(
  () => import(/* webpackChunkName: 'About' */ './pages/About').then((m) => m.About),
  { fallback: loading },
);
const Album = loadable(
  () => import(/* webpackChunkName: 'Album' */ './pages/Album').then((m) => m.Album),
  { fallback: loading },
);
const Albums = loadable(
  () => import(/* webpackChunkName: 'Albums' */ './pages/Albums').then((m) => m.Albums),
  { fallback: loading },
);
const BatchUpload = loadable(
  () =>
    import(/* webpackChunkName: 'BatchUpload' */ './pages/Photo/BatchUpload').then(
      (m) => m.BatchUpload,
    ),
  { fallback: loading },
);
const ConfirmEmail = loadable(
  () =>
    import(/* webpackChunkName: 'ConfirmEmail' */ './pages/ConfirmEmail').then(
      (m) => m.ConfirmEmail,
    ),
  { fallback: loading },
);
const Error = loadable(
  () => import(/* webpackChunkName: 'Error' */ './pages/Error').then((m) => m.Error),
  { fallback: loading },
);
const Home = loadable(
  () => import(/* webpackChunkName: 'Home' */ './pages/Home').then((m) => m.Home),
  { fallback: loading },
);
const LogIn = loadable(
  () => import(/* webpackChunkName: 'LogIn' */ './pages/LogIn').then((m) => m.LogIn),
  { fallback: loading },
);
const NewAlbum = loadable(
  () => import(/* webpackChunkName: 'NewAlbum' */ './pages/Album/Post').then((m) => m.NewAlbum),
  { fallback: loading },
);
const NewPhoto = loadable(
  () => import(/* webpackChunkName: 'NewPhoto' */ './pages/Photo/Post').then((m) => m.NewPhoto),
  { fallback: loading },
);
const NewVideo = loadable(
  () => import(/* webpackChunkName: 'NewVideo' */ './pages/Video/Post').then((m) => m.NewVideo),
  { fallback: loading },
);
const OldForum = loadable(
  () => import(/* webpackChunkName: 'OldForum' */ './pages/OldForum').then((m) => m.OldForum),
  { fallback: loading },
);
const Photo = loadable(
  () => import(/* webpackChunkName: 'Photo' */ './pages/Photo').then((m) => m.Photo),
  { fallback: loading },
);
const Profile = loadable(
  () => import(/* webpackChunkName: 'Profile' */ './pages/Profile').then((m) => m.Profile),
  { fallback: loading },
);
const User = loadable(
  () => import(/* webpackChunkName: 'User' */ './pages/User').then((m) => m.User),
  { fallback: loading },
);
const Users = loadable(
  () => import(/* webpackChunkName: 'Users' */ './pages/Users').then((m) => m.Users),
  { fallback: loading },
);
const Video = loadable(
  () => import(/* webpackChunkName: 'Video' */ './pages/Video').then((m) => m.Video),
  { fallback: loading },
);

const KEYBOARD_MODE_CLASS = 'keyboard-mode';
const MOUSE_MODE_CLASS = 'mouse-mode';
const MOUSE_MOVE_EVENT = 'mousemove';

class App extends React.Component {
  static propTypes = {
    appContextValueObject: PropTypes.instanceOf(AppContextValueObject).isRequired,
  };

  constructor(props) {
    super(props);

    this.mouseMoveListener = this.mouseMoveListener.bind(this);
  }

  componentDidMount() {
    window.addEventListener(MOUSE_MOVE_EVENT, this.mouseMoveListener);
  }

  componentWillUnmount() {
    window.removeEventListener(MOUSE_MOVE_EVENT, this.mouseMoveListener);
  }

  mouseMoveListener() {
    document.body.classList.add(MOUSE_MODE_CLASS);
    document.body.classList.remove(KEYBOARD_MODE_CLASS);
    window.removeEventListener(MOUSE_MOVE_EVENT, this.mouseMoveListener);
  }

  renderApp(contextValues) {
    return (
      <AppContext.Provider value={contextValues}>
        {/* Google Analytics */}
        <Route
          path="/"
          render={({ location }) => {
            const window = global.window;
            if (window && typeof window.ga === 'function') {
              window.ga('set', 'page', location.pathname + location.search);
              window.ga('send', 'pageview');
            }
            return null;
          }}
        />

        <Switch>
          <DefaultLayoutRoute path="/test" component={Test} exact />

          <DefaultLayoutRoute exact path={HOME} component={Home} />

          <DefaultLayoutRoute path={ABOUT} component={About} />
          <DefaultLayoutRoute path={ALBUM} component={Album} exact />
          <DefaultLayoutRoute path={ALBUM_NEW} component={NewAlbum} exact login={MANDATORY} />
          <DefaultLayoutRoute path={ALBUMS} component={Albums} />
          <DefaultLayoutRoute path={CONFIRM_EMAIL} component={ConfirmEmail} />
          <DefaultLayoutRoute path={ERROR} component={Error} />
          <DefaultLayoutRoute path={LOGIN} component={LogIn} login={FORBIDDEN} />
          <DefaultLayoutRoute path={OLD_FORUM} component={OldForum} />
          <DefaultLayoutRoute
            path={PHOTO_BATCH_UPLOAD_FOR_ALBUM}
            component={BatchUpload}
            login={MANDATORY}
          />
          <DefaultLayoutRoute path={PHOTO_NEW} component={NewPhoto} login={MANDATORY} />
          <DefaultLayoutRoute path={PHOTO_NEW_FOR_ALBUM} component={NewPhoto} login={MANDATORY} />
          <DefaultLayoutRoute path={PHOTO} component={Photo} />
          <DefaultLayoutRoute path={PROFILE} component={Profile} login={MANDATORY} />
          <DefaultLayoutRoute path={USER} component={User} />
          <DefaultLayoutRoute path={USERS} component={Users} />
          <DefaultLayoutRoute path={VIDEO} component={Video} exact />
          <DefaultLayoutRoute path={VIDEO_NEW} component={NewVideo} login={MANDATORY} />
          <DefaultLayoutRoute path={VIDEO_NEW_FOR_ALBUM} component={NewVideo} login={MANDATORY} />

          <DefaultLayoutRoute component={Page404} />
        </Switch>
      </AppContext.Provider>
    );
  }

  render() {
    const { appContextValueObject } = this.props;
    const loggedIn = !!appContextValueObject.values.login.data.accessToken;

    if (!loggedIn) {
      // Do not request ME if the user is logged-out as the backend reports an error.
      appContextValueObject.resetUser();
      const contextValues = appContextValueObject.getValues();
      return this.renderApp(contextValues);
    }

    return (
      <Query query={ME}>
        {(meResponse) => {
          const { error, data, loading: isLoading } = meResponse;

          if (isLoading) return <Spinner />;
          if (error) return <ErrorMessage />;

          const { me } = data;

          if (me && me.userId) {
            appContextValueObject.setUser(me);
          } else {
            appContextValueObject.resetUser();
          }

          const contextValues = appContextValueObject.getValues();
          return this.renderApp(contextValues);
        }}
      </Query>
    );
  }
}

export default App;
