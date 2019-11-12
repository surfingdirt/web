import React from 'react';
import PropTypes from 'prop-types';

import ResponsiveImage from 'Components/Widgets/ResponsiveImage';
import VideoEmbed from 'Components/Video/Embed';
import { mediaTypes } from 'Utils/media';

const { VIDEO } = mediaTypes;

const HeroContent = ({ className, media }) => {
  let heroContent;

  if (media.mediaType === VIDEO) {
    const { embedUrl, height, width, mediaSubType } = media;
    heroContent = (
      <VideoEmbed
        url={embedUrl}
        height={height}
        mediaSubType={mediaSubType}
        width={width}
        className={className}
      />
    );
  } else {
    const { images } = media;

    heroContent = <ResponsiveImage alt="" images={images} className={className} />;
  }

  return heroContent;
};

HeroContent.propTypes = {
  className: PropTypes.string,
};

HeroContent.defaultProps = {
  className: null,
};

export default HeroContent;
