import React from 'react';
import PropTypes from 'prop-types';

import VIDEO from 'Apollo/queries/video3.gql';
import DataRenderer from 'Components/Widgets/DataRenderer';
import MediaPageContent from 'Components/Media/MediaPageContent';
import { mediaTypes } from 'Utils/media';

const { VIDEO: VIDEO_TYPE } = mediaTypes;

export const Video = ({ match }) => {
  const { id } = match.params;

  return (
    <DataRenderer
      query={VIDEO}
      variables={{ id }}
      render={({ listComments, video }) => {
        const media = Object.assign({}, video, { mediaType: VIDEO_TYPE });
        return <MediaPageContent media={media} comments={listComments} />;
      }}
    />
  );
};

Video.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
