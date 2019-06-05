/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import HOMEPAGE from 'Apollo/queries/home.gql';
import DataRenderer from 'Components/DataRenderer';
import ErrorMessage from 'Components/ErrorMessage';
import Spinner from 'Components/Spinner';
import Translate from 'Hocs/Translate';
import { albumRoute, actionRoute } from 'Utils/links';
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
  const {
    galleryAlbumId,
    login: {
      data: { accessToken },
    },
  } = context;
  const isLoggedIn = !!accessToken;

  return (
    <DataRenderer
      query={HOMEPAGE}
      variables={{ albumId: galleryAlbumId }}
      render={(data) => {
        const {
          album: { id, title, description },
        } = data;
        return (
          <ul>
            <li>{isLoggedIn ? renderLogout() : <Link to={LOGIN}>Login page</Link>}</li>
            <li>
              <Link to={albumRoute(id)}>
                <span>{title}</span>-<span>{description}</span>
              </Link>
            </li>
          </ul>
        );
      }}
    />
  );
};

Index.contextType = AppContext;

Index.propTypes = {
  t: PropTypes.func.isRequired,
};

export const Home = Translate(messages)(Index);
