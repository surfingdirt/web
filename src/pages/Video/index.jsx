import React from 'react';
import { Query } from 'react-apollo';

import VIDEO from 'Apollo/queries/video.gql';
import ErrorMessage from 'Components/ErrorMessage';
import Spinner from 'Components/Spinner';

import styles from './styles.scss';

export const Video = ({ match }) => {
  const { id } = match.params;

  return (
    <Query query={VIDEO} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return <ErrorMessage />;

        const {
          video: { title, thumbs, vendorUrl },
        } = data;
        return (
          <div className={styles.page}>
            <p>This is the Video page.</p>
            <p>
              <img src={thumbs[0].url} alt="" />
              <a href={vendorUrl}>{title}</a>
            </p>
          </div>
        );
      }}
    </Query>
  );
};
