import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ALBUM from 'Apollo/queries/album.gql';
import AlbumPreview from 'Components/AlbumPreview';
import DataRenderer from 'Components/DataRenderer';
import routes from '~/routes';

const { PHOTO_NEW } = routes;

export const Album = ({ match }) => {
  const { id: albumId } = match.params;

  return (
    <DataRenderer
      query={ALBUM}
      variables={{ id: albumId }}
      render={({ album }) => (
        <Fragment>
          <Link to={PHOTO_NEW}>Post a new photo</Link>

          <p>TODO: replace this preview display with a full-fletched grid</p>
          <AlbumPreview album={album} />
        </Fragment>
      )}
    />
  );
};

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
