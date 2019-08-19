import React from 'react';
import PropTypes from 'prop-types';

import Card, { cardTypes } from 'Components/Card';
import Empty from 'Components/Empty';
import Heading, { headingTypes } from 'Components/Heading';
import MediaThumb from 'Components/MediaThumb';
import Paragraph from 'Components/Paragraph';
import StepSlider from 'Components/Slider';
import { albumRoute } from 'Utils/links';

import styles from './styles.scss';

const { BARE } = cardTypes;
const { SECONDARY } = headingTypes;

const AlbumPreview = ({
  album: { description, id: albumId, media, title: albumTitle },
  showAttribution,
  renderIfEmpty,
}) => {
  const isEmpty = !media || media.length === 0;
  if (isEmpty && !renderIfEmpty) {
    return null;
  }

  return (
    <Card className={styles.wrapper} type={BARE}>
      {isEmpty ? (
        <Empty />
      ) : (
        <StepSlider
          className={styles.items}
          prevClassName={styles.previous}
          nextClassName={styles.next}
        >
          {media.map(({ id, mediaType, title, thumbs }) => {
            const attrs = { id, mediaType, title, thumbs };
            return (
              <div key={id} className={styles.item}>
                <MediaThumb key={id} {...attrs} />
              </div>
            );
          })}
        </StepSlider>
      )}
      <div className={styles.contentWrapper}>
        <Heading className={styles.title} type={SECONDARY} link={albumRoute(albumId)}>
          {albumTitle}
        </Heading>
        {showAttribution && <p>TODO: showAttribution</p>}
        {description && <Paragraph className={styles.description}>{description}</Paragraph>}
      </div>
    </Card>
  );
};

AlbumPreview.propTypes = {
  album: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
    media: PropTypes.any,
    title: PropTypes.string.isRequired,
  }).isRequired,
  renderIfEmpty: PropTypes.bool,
  showAttribution: PropTypes.bool,
};

AlbumPreview.defaultProps = {
  renderIfEmpty: false,
  showAttribution: false,
};

export default AlbumPreview;
