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
import { LIVE, HIGHLIGHTS, VIDEO_ON_DEMAND } from '~/categories';

const {
  COOKIE_POLICY,
  CONFIRM_ACCOUNT,
  FORGOT_PASSWORD,
  HOME,
  PRIVACY_POLICY,
  REGISTRATION_STEP1,
  RESET_PASSWORD,
  SIGN_IN,
  SITEMAP,
  TERMS_CONDITIONS,
} = routes;

const Home = Loadable({
  loader: () => import(/* webpackChunkName: 'Index' */ './pages/Home').then((m) => m.Home),
  loading,
});
const SignIn = Loadable({
  loader: () => import(/* webpackChunkName: 'SignIn' */ './pages/SignIn').then((m) => m.SignIn),
  loading,
});
const RegistrationStep1 = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'RegistrationStep1' */ './pages/Registration/Step1').then(
      (m) => m.Step1,
    ),
  loading,
});
const ConfirmAccount = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'ConfirmAccount' */ './pages/ConfirmAccount').then(
      (m) => m.ConfirmAccount,
    ),
  loading,
});
const ForgotPassword = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'ForgotPassword' */ './pages/ForgotPassword').then(
      (m) => m.ForgotPassword,
    ),
  loading,
});
const ResetPassword = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'ResetPassword' */ './pages/ResetPassword').then(
      (m) => m.ResetPassword,
    ),
  loading,
});
const TermsConditions = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'TermsConditions' */ './pages/Terms&Conditions').then(
      (m) => m.TermsConditions,
    ),
  loading,
});
const CookiePolicy = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'CookiePolicy' */ './pages/CookiePolicy').then(
      (m) => m.CookiePolicy,
    ),
  loading,
});
const PrivacyPolicy = Loadable({
  loader: () =>
    import(/* webpackChunkName: 'PrivacyPolicy' */ './pages/PrivacyPolicy').then(
      (m) => m.PrivacyPolicy,
    ),
  loading,
});
const Sitemap = Loadable({
  loader: () => import(/* webpackChunkName: 'Sitemap' */ './pages/Sitemap').then((m) => m.Sitemap),
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

  renderApp(contextValues) {
    // TODO: get nav items through a GraphQL call.
    const navItems = [
      {
        label: 'Home',
        category: null,
      },
      {
        label: 'Live Matches',
        category: LIVE,
      },
      {
        label: 'Video On Demand',
        category: VIDEO_ON_DEMAND,
      },
      {
        label: 'Highlights',
        category: HIGHLIGHTS,
      },
    ];
    return (
      <AppContext.Provider value={contextValues}>
        <Layout navItems={navItems}>
          <Switch>
            <Route exact path={HOME} component={Home} />
            <Route path={SIGN_IN} component={SignIn} />
            <Route path={CONFIRM_ACCOUNT} component={ConfirmAccount} />
            <Route path={FORGOT_PASSWORD} component={ForgotPassword} />
            <Route path={RESET_PASSWORD} component={ResetPassword} />
            <Route path={REGISTRATION_STEP1} component={RegistrationStep1} />
            <Route path={TERMS_CONDITIONS} component={TermsConditions} />
            <Route path={COOKIE_POLICY} component={CookiePolicy} />
            <Route path={PRIVACY_POLICY} component={PrivacyPolicy} />
            <Route path={SITEMAP} component={Sitemap} />

            <Route component={Page404} />
          </Switch>
        </Layout>
      </AppContext.Provider>
    );
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
