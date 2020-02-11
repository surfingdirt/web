import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet-async';

import ALBUM_WITH_MEDIA from 'Apollo/queries/albumWithMedia.gql';
import ErrorMessage from 'Components/Widgets/ErrorMessage';
import Spinner from 'Components/Widgets/Spinner';
import { getFirstAlbumImageUrl, mediaPageSize } from 'Utils/media';

import AlbumView from './view';

const countItems = mediaPageSize;

const Album = ({ match }) => {
  const { id } = match.params;

  const { data, error, fetchMore, loading } = useQuery(ALBUM_WITH_MEDIA, {
    variables: {
      id,
      startItem: 0,
      countItems,
    },
  });

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage />;

  const { album, listMedia } = data;

  const {
    description: { text: description },
    title: { text: title },
  } = album;
  const image = getFirstAlbumImageUrl(listMedia);

  return (
    <Fragment>
      <Helmet>
        {title && <title>{title}</title>}
        {title && <meta property="og:title" content={title} />}
        {description && <meta property="og:description" content={description} />}
        {image && <meta property="og:image" content={image} />}
      </Helmet>
      <AlbumView
        album={album}
        countItems={countItems}
        fetchMore={fetchMore}
        listMedia={listMedia}
      />
    </Fragment>
  );
};

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
