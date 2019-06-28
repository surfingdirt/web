import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

import EnforceLogin, { FORBIDDEN, MANDATORY } from 'Components/EnforceLogin';
import Layout from 'Sections/Layout';

export const DefaultLayoutRoute = ({ component: Component, login, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => {
      const content = <Component {...matchProps} />;
      if (login) {
        return (
          <Layout>
            <EnforceLogin rule={login}>{content}</EnforceLogin>
          </Layout>
        );
      }
      return <Layout>{content}</Layout>;
    }}
  />
);

DefaultLayoutRoute.propTypes = {
  login: PropTypes.oneOf([FORBIDDEN, MANDATORY]),
  component: PropTypes.any.isRequired,
};

DefaultLayoutRoute.defaultProps = {
  login: null,
};
