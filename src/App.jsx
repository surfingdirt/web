import Loadable from '@7rulnik/react-loadable';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { Route, Switch } from 'react-router';

import ME from 'Apollo/queries/me.gql';
import ErrorMessage from 'Components/ErrorMessage';
import Layout from 'Components/Layout';
import loading from 'Components/Loading/Loading';
import Spinner from 'Components/Spinner';
import { Page404 } from 'Pages/Page404';

import contexts from '~/contexts';
import '~/main.scss';
import routes from '~/routes';

const { ALBUM, ERROR, HOME, LOGIN, USER, PHOTO, PHOTO_NEW, VIDEO } = routes;

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
const Video = Loadable({
  loader: () => import(/* webpackChunkName: 'Video' */ './pages/Video').then((m) => m.Video),
  loading,
});
const Photo = Loadable({
  loader: () => import(/* webpackChunkName: 'Photo' */ './pages/Photo').then((m) => m.Photo),
  loading,
});
const NewPhoto = Loadable({
  loader: () => import(/* webpackChunkName: 'NewPhoto' */ './pages/Photo/Post').then((m) => m.NewPhoto),
  loading,
});
const User = Loadable({
  loader: () => import(/* webpackChunkName: 'User' */ './pages/User').then((m) => m.User),
  loading,
});
const { AppContext, AppContextValueObject } = contexts;

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
        <Layout>
          <Switch>
            <Route exact path={HOME} component={Home} />
            <Route exact path={ALBUM} component={Album} />
            <Route exact path={ERROR} component={Error} />
            <Route path={LOGIN} component={LogIn} />
            <Route path={PHOTO_NEW} component={NewPhoto} />
            <Route path={PHOTO} component={Photo} />
            <Route path={USER} component={User} />
            <Route path={VIDEO} component={Video} />

            <Route component={Page404} />
          </Switch>
        </Layout>
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

          if (me && me.id) {
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
