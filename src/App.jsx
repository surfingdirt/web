import Loadable from '@7rulnik/react-loadable';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { Route, Switch } from 'react-router';

import ME from 'Apollo/queries/me.gql';
import ErrorMessage from 'Components/ErrorMessage';
import loading from 'Components/Loading';
import Spinner from 'Components/Spinner';
import { Page404 } from 'Pages/Page404';
import Layout from 'Sections/Layout';

import AppContext, { AppContextValueObject } from '~/contexts';

import '~/main.scss';
import routes from '~/routes';

const { ALBUM, ERROR, HOME, LOGIN, USER, PHOTO, PHOTO_NEW, PROFILE, VIDEO } = routes;

const Album = Loadable({
  loader: () => import(/* webpackChunkName: 'Album' */ './pages/Album').then((m) => m.Album),
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
const NewPhoto = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'NewPhoto' */ './pages/Photo/Post').then((m) => m.NewPhoto),
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

const DefaultLayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <Layout>
        <Component {...matchProps} />
      </Layout>
    )}
  />
);

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
          <DefaultLayoutRoute exact path={ALBUM} component={Album} />
          <DefaultLayoutRoute exact path={ERROR} component={Error} />
          <DefaultLayoutRoute path={LOGIN} component={LogIn} />
          <DefaultLayoutRoute path={PHOTO_NEW} component={NewPhoto} />
          <DefaultLayoutRoute path={PHOTO} component={Photo} />
          <DefaultLayoutRoute path={PROFILE} component={Profile} />
          <DefaultLayoutRoute path={USER} component={User} />
          <DefaultLayoutRoute path={VIDEO} component={Video} />

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
