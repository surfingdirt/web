import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import USER from 'Apollo/queries/user.gql';
import Presentation from 'Components/User/Presentation';
import Card, { cardTypes } from 'Components/Widgets/Card';
import DataRenderer from 'Components/Widgets/DataRenderer';

import AlbumList from './AlbumList';

const { BARE } = cardTypes;

const User = ({ match }) => {
  const { id: userId } = match.params;

  return (
    <DataRenderer
      query={USER}
      variables={{ userId }}
      render={(data) => {
        const { user } = data;
        const {
          bio: { text: bio },
          username,
          userId: albumUserId,
        } = user;

        return (
          <Fragment>
            <Helmet>
              {username && <title>{username}</title>}
              {bio && <meta name="description" content={bio} />}
              {username && <meta property="og:title" content={username} />}
              {bio && <meta property="og:description" content={bio} />}
            </Helmet>

            <Card type={BARE}>
              <Presentation user={user} />
            </Card>

            <AlbumList userId={albumUserId} />
          </Fragment>
        );
      }}
    />
  );
};

User.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default User;
