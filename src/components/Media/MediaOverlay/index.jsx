import React from 'react';
import PropTypes from 'prop-types';

import HeroContent from 'Components/Media/HeroContent';

const MediaOverlay = ({ media }) => {
  // TODO: display the initial media, fetch paginated lists of media
  return <HeroContent media={media} />;
};

MediaOverlay.propTypes = {
  media: PropTypes.shape({
    // album: PropTypes.number.isRequired,
  }).isRequired,
};

export default MediaOverlay;
