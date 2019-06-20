import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PHOTO from 'Apollo/queries/photo.gql';
import Card from 'Components/Card';
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
          <Card title={title} type="main">
            <img src={images[2].url} alt="" />
            <p>
              <span>Owner:</span>
              <Link to={userRoute(userId)}>{username}</Link>
            </p>
          </Card>
        );
      }}
    />
  );
};

Photo.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
