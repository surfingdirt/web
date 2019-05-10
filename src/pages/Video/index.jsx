import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import VIDEO from 'Apollo/queries/video.gql';
import ErrorMessage from 'Components/ErrorMessage';
import Spinner from 'Components/Spinner';
import { albumRoute, userRoute } from 'Utils/links';

import styles from './styles.scss';

export const Video = ({ match }) => {
  const { id } = match.params;

  return (
    <Query query={VIDEO} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return <ErrorMessage />;

        const {
          video: { title, thumbs, album, submitter, vendorUrl },
        } = data;
        return (
          <div className={styles.page}>
            <h1>{title}</h1>
            <p>
              <img src={thumbs[0].url} alt="" />
            </p>
            <p>
              <a href={vendorUrl}>{title}</a>
            </p>
            <p>
              Posted by <Link to={userRoute(submitter.userId)}>{submitter.username}</Link>
            </p>
            <p>
              In album <Link to={albumRoute(album.id)}>{album.title}</Link>
            </p>
          </div>
        );
      }}
    </Query>
  );
};
