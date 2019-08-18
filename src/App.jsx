import Loadable from '@7rulnik/react-loadable';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { Switch } from 'react-router';

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
  ERROR,
  HOME,
  LOGIN,
  USER,
  PHOTO,
  PHOTO_NEW,
  PHOTO_NEW_FOR_ALBUM,
  PROFILE,
  VIDEO,
  VIDEO_NEW,
} = routes;

const About = Loadable({
  loader: () => import(/* webpackChunkName: 'About' */ './pages/About').then((m) => m.About),
  loading,
});
const Album = Loadable({
  loader: () => import(/* webpackChunkName: 'Album' */ './pages/Album').then((m) => m.Album),
  loading,
});
const Albums = Loadable({
  loader: () => import(/* webpackChunkName: 'Album' */ './pages/Albums').then((m) => m.Albums),
  loading,
});
const Error = Loadable({
  loader: () => import(/* webpackChunkName: 'Error' */ './pages/Error').then((m) => m.Error),
  loading,
});
const Home = Loadable({
  loader: () => import(/* webpackChunkName: 'Home' */ './pages/Home').then((m) => m.Home),
  loading,
});
const LogIn = Loadable({
  loader: () => import(/* webpackChunkName: 'LogIn' */ './pages/LogIn').then((m) => m.LogIn),
  loading,
});
const NewAlbum = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'NewAlbum' */ './pages/Album/Post').then((m) => m.NewAlbum),
  loading,
});
const NewPhoto = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'NewPhoto' */ './pages/Photo/Post').then((m) => m.NewPhoto),
  loading,
});
const NewVideo = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'NewVideo' */ './pages/Video/Post').then((m) => m.NewVideo),
  loading,
});
const Photo = Loadable({
  loader: () => import(/* webpackChunkName: 'Photo' */ './pages/Photo').then((m) => m.Photo),
  loading,
});
const Profile = Loadable({
  loader: () => import(/* webpackChunkName: 'Profile' */ './pages/Profile').then((m) => m.Profile),
  loading,
});
const User = Loadable({
  loader: () => import(/* webpackChunkName: 'User' */ './pages/User').then((m) => m.User),
  loading,
});
const Video = Loadable({
  loader: () => import(/* webpackChunkName: 'Video' */ './pages/Video').then((m) => m.Video),
  loading,
});

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
    window.removeEventListener(MOUSE_MOVE_EVENT, this.mouseMoveListener);
  }

  renderApp(contextValues) {
    return (
      <AppContext.Provider value={contextValues}>
        <Switch>
          <DefaultLayoutRoute exact path={HOME} component={Home} />

          <DefaultLayoutRoute path={ABOUT} component={About} />
          <DefaultLayoutRoute path={ALBUM} component={Album} exact />
          <DefaultLayoutRoute path={ALBUM_NEW} component={NewAlbum} exact />
          <DefaultLayoutRoute path={ALBUMS} component={Albums} />
          <DefaultLayoutRoute path={ERROR} component={Error} />
          <DefaultLayoutRoute path={LOGIN} component={LogIn} login={FORBIDDEN} />
          <DefaultLayoutRoute path={PHOTO_NEW} component={NewPhoto} login={MANDATORY} />
          <DefaultLayoutRoute path={PHOTO_NEW_FOR_ALBUM} component={NewPhoto} login={MANDATORY} />
          <DefaultLayoutRoute path={PHOTO} component={Photo} />
          <DefaultLayoutRoute path={PROFILE} component={Profile} login={MANDATORY} />
          <DefaultLayoutRoute path={USER} component={User} />
          <DefaultLayoutRoute path={VIDEO} component={Video} exact />
          <DefaultLayoutRoute path={VIDEO_NEW} component={NewVideo} />

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
          const {
            error,
            data: { me },
            loading: isLoading,
          } = meResponse;

          if (isLoading) return <Spinner />;
          if (error) return <ErrorMessage />;

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
