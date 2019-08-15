import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ALBUM from 'Apollo/queries/album.gql';
import AlbumGrid from 'Components/AlbumGrid';
import Card, { cardTypes } from 'Components/Card';
import DataRenderer from 'Components/DataRenderer';
import { newPhotoForAlbumRoute } from 'Utils/links';
import AppContext from '~/contexts';
import routes from '~/routes';

const { PHOTO_NEW } = routes;
const { STANDARD } = cardTypes;

export class Album extends React.Component {
  static propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  static contextType = AppContext;

  render() {
    const { match } = this.props;
    const { galleryAlbumId } = this.context;
    const { id: albumId } = match.params;

    const newLink = albumId === galleryAlbumId ? PHOTO_NEW : newPhotoForAlbumRoute(albumId);

    return (
      <DataRenderer
        query={ALBUM}
        variables={{ id: albumId }}
        render={({ album: { media, title } }) => (
          <Card type={STANDARD} title={title}>
            <Link to={newLink}>Post a new photo</Link>
            <AlbumGrid media={media} />
          </Card>
        )}
      />
    );
  }
}
