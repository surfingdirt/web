import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ALBUM from 'Apollo/queries/album.gql';
import AlbumPreview from 'Components/AlbumPreview';
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
          album: { title: albumTitle },
        } = data;

        return (
          <Card title={albumTitle} type={STANDARD}>
            <Link to={PHOTO_NEW}>Post a new photo</Link>

            <p>TODO: replace this preview display with a full-fletched grid</p>
            <AlbumPreview album={data.album} />
          </Card>
        );
      }}
    />
  );
};

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
