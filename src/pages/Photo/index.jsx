import React from 'react';
import PropTypes from 'prop-types';

import MEDIA from 'Apollo/queries/media.gql';
import DataRenderer from 'Components/Widgets/DataRenderer';
import MediaPageContent from 'Components/Media/MediaPageContent';
import { mediaTypes } from 'Utils/media';

const { PHOTO } = mediaTypes;

const Photo = ({ match }) => {
  const { id } = match.params;

  return (
    <DataRenderer
      query={MEDIA}
      variables={{ id, mediaType: PHOTO.toLowerCase() }}
      render={({ listComments, media }) => (
        <MediaPageContent media={media} comments={listComments} />
      )}
    />
  );
};

Photo.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Photo;
