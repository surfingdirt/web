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

        // console.log(JSON.stringify(media, null, 2));

        return (
          <div className={styles.page}>
            <h1>{title}</h1>
            <ul>
              {media.map(({ id, title, mediaType, thumbs }) => (
                <li key={id}>
                  <Link to={mediaType === 'photo' ? photoRoute(id) : videoRoute(id)}>
                    /* necessaire parce que les donnees de test sont pourries */
                    <img src={thumbs && thumbs.length > 0 && thumbs[0].url} alt="thumb" />
                    <span>{title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </Query>
  );
};
