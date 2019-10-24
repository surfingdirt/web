import React from 'react';
import PropTypes from 'prop-types';

const MediaOverlay = ({ media }) => {
  // TODO: display the initial media, fetch paginated lists of media
  console.log('MediaOverlay - rendering', { media });
  return <div>This is the media overlay</div>;
};

MediaOverlay.propTypes = {
  media: PropTypes.shape({
    // album: PropTypes.number.isRequired,
  }).isRequired,
};

export default MediaOverlay;
