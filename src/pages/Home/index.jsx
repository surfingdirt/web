/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import HOMEPAGE from 'Apollo/queries/homepageVideo.gql';
import ErrorMessage from 'Components/ErrorMessage';
import Spinner from 'Components/Spinner';
import Translate from 'Hocs/Translate';
import { videoRoute, albumRoute, actionRoute } from 'Utils/links';
import actions from '~/actions';
import contexts from '~/contexts';
import routes from '~/routes';

import messages from './messages';

const { AppContext } = contexts;

const { LOGOUT } = actions;
const { LOGIN } = routes;

const renderLogout = () => (
  <form action={actionRoute(LOGOUT)} method="POST" encType="multipart/form-data">
    <button type="submit">Logout</button>
  </form>
);

const Index = ({ t }, context) => {
  const isLoggedIn = !!context.login.data.accessToken;

  return (
    <Query query={HOMEPAGE}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return <ErrorMessage />;

        const {
          video: { id, title },
        } = data;
        return (
          <ul>
            <li>{isLoggedIn ? renderLogout() : <Link to={LOGIN}>Login page</Link>}</li>
            <li>
              <Link to={videoRoute(id)}>Video page: {title}</Link>
            </li>
            <li>
              <Link to={albumRoute('a3833b1c-1db0-4a93-9efc-b6659400ce9f')}>Gallery</Link>
            </li>
          </ul>
        );
      }}
    </Query>
  );
};

Index.contextType = AppContext;

Index.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
};

export const Home = Translate(messages)(Index);
