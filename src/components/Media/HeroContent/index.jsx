import React from 'react';
import PropTypes from 'prop-types';

import ResponsiveImage from 'Components/ResponsiveImage';
import VideoEmbed from 'Components/Video/Embed';
import { mediaTypes } from 'Utils/media';

const { VIDEO } = mediaTypes;

const HeroContent = ({ media }) => {
  let heroContent;

  if (media.mediaType === VIDEO) {
    const { embedUrl, height, width, mediaSubType } = media;
    heroContent = (
      <VideoEmbed url={embedUrl} height={height} mediaSubType={mediaSubType} width={width} />
    );
  } else {
    const { images } = media;

    heroContent = <ResponsiveImage alt="" images={images} />;
  }

  return heroContent;
};

HeroContent.propTypes = {};

export default HeroContent;
