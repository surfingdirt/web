import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import AppRoutes from '~/AppRoutes';
import AppContext, { AppContextValueObject } from '~/contexts';
import '~/main.scss';

const KEYBOARD_MODE_CLASS = 'keyboard-mode';
const MOUSE_MODE_CLASS = 'mouse-mode';
const MOUSE_MOVE_EVENT = 'mousemove';
const WITH_JS_CLASS = 'with-js';

const renderApp = (contextValues) => {
  const { dir, locale } = contextValues;
  return (
    <AppContext.Provider value={contextValues}>
      <Helmet>
        <html dir={dir} lang={locale} />
      </Helmet>
      <AppRoutes />
    </AppContext.Provider>
  );
};

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
    document.body.classList.add(WITH_JS_CLASS);
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
    const contextValues = appContextValueObject.getValues();
    return renderApp(contextValues);
  }
}

export default App;
