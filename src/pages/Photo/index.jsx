import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PHOTO from 'Apollo/queries/photo.gql';
import DataRenderer from 'Components/DataRenderer';
import { userRoute } from 'Utils/links';

import styles from './styles.scss';

export const Photo = ({ match }) => {
  const { id } = match.params;

  return (
    <DataRenderer
      query={PHOTO}
      variables={{ id }}
      render={(data) => {
        const {
          photo: {
            title,
            images,
            submitter: { userId, username },
          },
        } = data;
        return (
          <div className={styles.page}>
            <h1>{title}</h1>
            <p>
              <img src={images[2].url} alt="" />
            </p>
            <p>
              <span>Owner:</span>
              <Link to={userRoute(userId)}>{username}</Link>
            </p>
          </div>
        );
      }}
    />
  );
};

Photo.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
