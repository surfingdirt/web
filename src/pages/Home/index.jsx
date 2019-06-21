/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import HOMEPAGE from 'Apollo/queries/home.gql';
import DataRenderer from 'Components/DataRenderer';
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

class HomeRaw extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;
    const {
      galleryAlbumId,
      login: {
        data: { accessToken },
      },
    } = this.context;
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
  }
}

export const Home = Translate(messages)(HomeRaw);
