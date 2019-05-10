import React from 'react';
import { Query } from 'react-apollo';

import PHOTO from 'Apollo/queries/photo.gql';
import ErrorMessage from 'Components/ErrorMessage';
import Spinner from 'Components/Spinner';

import styles from './styles.scss';

export const Photo = ({ match }) => {
  const { id } = match.params;

  return (
    <Query query={PHOTO} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return <ErrorMessage />;

        const {
          photo: { title, images },
        } = data;
        return (
          <div className={styles.page}>
            <p>This is the Photo page.</p>
            <p>
              <img src={images[0].url} alt="" />
            </p>
            <p>
              <span>{title}</span>
            </p>
          </div>
        );
      }}
    </Query>
  );
};
