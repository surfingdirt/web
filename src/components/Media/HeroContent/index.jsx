import React from 'react';
import PropTypes from 'prop-types';

import ResponsiveImage from 'Components/Widgets/ResponsiveImage';
import VideoEmbed from 'Components/Video/Embed';
import { mediaTypes } from 'Utils/media';
import { MediaType } from 'Utils/types';

import styles from './styles.scss';

const { VIDEO } = mediaTypes;

const HeroContent = ({ className, media }) => {
  let heroContent;

  if (media.mediaType === VIDEO) {
    const { embedUrl, height, width, mediaSubType, vendorKey } = media;
    heroContent = (
      <VideoEmbed
        url={embedUrl}
        vendorKey={vendorKey}
        height={height}
        mediaSubType={mediaSubType}
        width={width}
        className={className}
      />
    );
  } else {
    const { images } = media;

    heroContent = (
      <ResponsiveImage
        alt=""
        images={images}
        className={className}
        wrapperClassName={styles.limitHeight}
        objectFit="contain"
      />
    );
  }

  return heroContent;
};

HeroContent.propTypes = {
  className: PropTypes.string,
  media: MediaType.isRequired,
};

HeroContent.defaultProps = {
  className: null,
};

export default HeroContent;
