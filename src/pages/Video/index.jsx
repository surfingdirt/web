import React from 'react';
import PropTypes from 'prop-types';

import MEDIA from 'Apollo/queries/media2.gql';
import DataRenderer from 'Components/Widgets/DataRenderer';
import MediaPageContent from 'Components/Media/MediaPageContent';
import { mediaTypes } from 'Utils/media';

const { VIDEO } = mediaTypes;

const Video = ({ match }) => {
  const { id } = match.params;

  return (
    <DataRenderer
      query={MEDIA}
      variables={{ id, mediaType: VIDEO.toLowerCase() }}
      render={({ listComments, media }) => (
        <MediaPageContent media={media} comments={listComments} />
      )}
    />
  );
};

Video.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Video;
