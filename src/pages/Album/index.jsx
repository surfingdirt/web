import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import ALBUM from 'Apollo/queries/album.gql';
import ErrorMessage from 'Components/ErrorMessage';
import Spinner from 'Components/Spinner';
import { photoRoute, videoRoute } from 'Utils/links';

import styles from './styles.scss';

export const Album = ({ match }) => {
  const { id } = match.params;

  return (
    <Query query={ALBUM} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) return <Spinner />;
        if (error) return <ErrorMessage />;

        const {
          album: { title, media },
        } = data;

        return (
          <div className={styles.page}>
            <h1>{title}</h1>
            <ol>
              {media.map(({ id, title, mediaType, thumbs }) => (
                <li key={id}>
                  <Link to={mediaType === 'PHOTO' ? photoRoute(id) : videoRoute(id)}>
                    {/* necessaire parce que les donnees de test sont pourries */}
                    <img src={thumbs && thumbs.length > 0 && thumbs[0].url} alt="thumb" />
                    <span>{title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        );
      }}
    </Query>
  );
};
