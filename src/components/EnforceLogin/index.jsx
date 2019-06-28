import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

import AppContext from '~/contexts';
import routes from '~/routes';

const { HOME, LOGIN } = routes;

export const FORBIDDEN = 'forbidden';
export const MANDATORY = 'mandatory';

class EnforceLogin extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    children: PropTypes.node.isRequired,
    rule: PropTypes.oneOf([FORBIDDEN, MANDATORY]),
  };

  static defaultProps = {
    rule: null,
  };

  render() {
    const {
      props: { children, rule },
      context: {
        login: {
          saveOrigin,
          clearOrigin,
          data: {
            me: { username },
          },
        },
      },
    } = this;

    switch (rule) {
      case FORBIDDEN:
        if (username) {
          clearOrigin();
          return <Redirect to={HOME} />;
        }
        break;
      case MANDATORY:
        if (!username) {
          saveOrigin();
          return <Redirect to={LOGIN} />;
        }
        break;
      default:
        break;
    }

    clearOrigin();
    return children;
  }
}

export default EnforceLogin;
