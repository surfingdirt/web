import React from 'react';
import PropTypes from 'prop-types';

import MEDIA from 'Apollo/queries/media2.gql';
import DataRenderer from 'Components/Widgets/DataRenderer';
import MediaPageContent from 'Components/Media/MediaPageContent';

const Media = ({ match }) => {
  const { id } = match.params;

  return (
    <DataRenderer
      query={MEDIA}
      variables={{ id }}
      render={({ media }) => <MediaPageContent media={media} />}
    />
  );
};

Media.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Media;
