import React from 'react';
import PropTypes from 'prop-types';

import Card, { cardTypes } from 'Components/Card';
import HeroContent from 'Components/Media/HeroContent';
import MediaMetadata from 'Components/Media/MediaMetadata';

import styles from './styles.scss';

const { STANDARD } = cardTypes;

const MediaOverlay = ({ media }) => {
  // TODO: display the initial media, fetch paginated lists of media
  return (
    <div className={styles.wrapper}>
      <HeroContent media={media} className={styles.hero} />

      <Card type={STANDARD} className={styles.metadata}>
        <MediaMetadata media={media} />
      </Card>
    </div>
  );
};

MediaOverlay.propTypes = {
  media: PropTypes.shape({
    // album: PropTypes.number.isRequired,
  }).isRequired,
};

export default MediaOverlay;
