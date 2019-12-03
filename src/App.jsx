import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';

import ME from 'Apollo/queries/me.gql';
import ErrorMessage from 'Components/ErrorMessage';
import Spinner from 'Components/Spinner';

import AppContext, { AppContextValueObject } from '~/contexts';
import '~/main.scss';
import appRoutes from '~/./appRoutes';

const KEYBOARD_MODE_CLASS = 'keyboard-mode';
const MOUSE_MODE_CLASS = 'mouse-mode';
const MOUSE_MOVE_EVENT = 'mousemove';

const renderApp = (contextValues) => (
  <AppContext.Provider value={contextValues}>{appRoutes}</AppContext.Provider>
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
    document.body.classList.remove(KEYBOARD_MODE_CLASS);
    window.removeEventListener(MOUSE_MOVE_EVENT, this.mouseMoveListener);
  }

  render() {
    const { appContextValueObject } = this.props;
    const loggedIn = !!appContextValueObject.values.login.data.accessToken;

    if (!loggedIn) {
      // Do not request ME if the user is logged-out as the backend reports an error.
      appContextValueObject.resetUser();
      const contextValues = appContextValueObject.getValues();
      return renderApp(contextValues);
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
          return renderApp(contextValues);
        }}
      </Query>
    );
  }
}

export default App;
