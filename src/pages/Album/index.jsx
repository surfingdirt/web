import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import ALBUM from 'Apollo/queries/album.gql';
import AlbumGrid from 'Components/Album/AlbumGrid';
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
        render={({ album: { description, media, title } }) => (
          <Card type={STANDARD} title={title}>
            <Helmet>
              {title && <title>{title}</title>}
              {description && <meta name="description" content={description} />}
            </Helmet>

            <Link to={newLink}>Post a new photo yo</Link>
            <AlbumGrid media={media} />
          </Card>
        )}
      />
    );
  }
}
