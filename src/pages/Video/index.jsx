import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import VIDEO from 'Apollo/queries/video2.gql';
import DataRenderer from 'Components/DataRenderer';
import { albumRoute, userRoute } from 'Utils/links';

import styles from './styles.scss';

export const Video = ({ match }) => {
  const { id } = match.params;

  return (
    <DataRenderer
      query={VIDEO}
      variables={{ id }}
      render={(data) => {
        const {
          video: { title, embedUrl },
        } = data;
        return (
          <div className={styles.page}>
            <h1>{title}</h1>
            <iframe src={embedUrl} />
          </div>
        );
      }}
    />
  );
};

Video.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
