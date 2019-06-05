import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ALBUM from 'Apollo/queries/album.gql';
import DataRenderer from 'Components/DataRenderer';
import { photoRoute, videoRoute } from 'Utils/links';

import styles from './styles.scss';
import routes from '~/routes';

const { PHOTO_NEW } = routes;

export const Album = ({ match }) => {
  const { id: albumId } = match.params;

  return (
    <DataRenderer
      query={ALBUM}
      variables={{ id: albumId }}
      render={(data) => {
        const {
          album: { title: albumTitle, media },
        } = data;

        return (
          <div className={styles.page}>
            <h1>{albumTitle}</h1>

            <Link to={PHOTO_NEW}>Post a new photo</Link>

            <div className={styles.grid}>
              {media.map(({ id, title, mediaType, thumbs }) => (
                <div key={id}>
                  <Link to={mediaType === 'PHOTO' ? photoRoute(id) : videoRoute(id)}>
                    <img src={thumbs && thumbs.length > 0 && thumbs[0].url} alt="thumb" />
                    <span>{title}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      }}
    />
  );
};

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
