import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import USER from 'Apollo/queries/user.gql';
import DataRenderer from 'Components/DataRenderer';
import { albumRoute } from 'Utils/links';

import styles from './styles.scss';

export const User = ({ match }) => {
  const { id: userId } = match.params;

  return (
    <DataRenderer
      query={USER}
      variables={{ userId }}
      render={(data) => {
        const {
          user: { username, album },
        } = data;

        const { id, title } = album;
        return (
          <div className={styles.page}>
            <p>This is the User page.</p>
            <h1>{username}</h1>
            <p>
              <span>Album:</span>&nbsp;<Link to={albumRoute(id)}>{title}</Link>
            </p>
          </div>
        );
      }}
    />
  );
};

User.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
