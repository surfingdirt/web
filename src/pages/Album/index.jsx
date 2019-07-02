import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ALBUM from 'Apollo/queries/album.gql';
import Card, { cardTypes } from 'Components/Card';
import DataRenderer from 'Components/DataRenderer';
import ResponsiveImage from 'Components/ResponsiveImage';
import { photoRoute, videoRoute } from 'Utils/links';
import routes from '~/routes';

import styles from './styles.scss';

const { PHOTO_NEW } = routes;
const { STANDARD } = cardTypes;

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

        // TODO: refine this after settling on a design, as this will guide which image size loads.
        const sizes = `(max-width:320px) 90px, (min-width:321px) 100px, (min-width:1024px) 150px`;

        return (
          <Card title={albumTitle} type={STANDARD}>
            <Link to={PHOTO_NEW}>Post a new photo</Link>

            <ul className={styles.items}>
              {media.map(({ id, title, mediaType, thumbs }) => (
                <li key={id}>
                  <Link to={mediaType === 'PHOTO' ? photoRoute(id) : videoRoute(id)}>
                    <ResponsiveImage alt="" images={thumbs} sizes={sizes} />
                    <span>{title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        );
      }}
    />
  );
};

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
