import React from 'react';
import PropTypes from 'prop-types';

import VIDEO from 'Apollo/queries/video.gql';
import DataRenderer from 'Components/DataRenderer';
import MediaPageContent from 'Components/MediaPageContent';
import { mediaTypes } from 'Utils/media';

const { VIDEO: VIDEO_TYPE } = mediaTypes;

export const Video = ({ match }) => {
  const { id } = match.params;

  return (
    <DataRenderer
      query={VIDEO}
      variables={{ id }}
      render={({ video }) => <MediaPageContent mediaType={VIDEO_TYPE} media={video} />}
    />
  );
};

Video.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
