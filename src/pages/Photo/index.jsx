import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import PHOTO from 'Apollo/queries/photo.gql';
import Card, { cardTypes } from 'Components/Card';
import DataRenderer from 'Components/DataRenderer';
import ResponsiveImage from 'Components/ResponsiveImage';
import { userRoute } from 'Utils/links';

import styles from './styles.scss';

const { HERO } = cardTypes;

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

        // TODO: add sizes attr to ResponsiveImage to guide which image size loads.
        return (
          <Card
            title={title}
            type={HERO}
            heroContent={<ResponsiveImage alt="" className={styles.heroImage} images={images} />}
          >
            <div>
              <span>Posted by:</span> <Link to={userRoute(userId)}>{username}</Link>
            </div>
          </Card>
        );
      }}
    />
  );
};

Photo.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
