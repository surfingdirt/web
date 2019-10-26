import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Card, { cardTypes } from 'Components/Card';
import HeroContent from 'Components/Media/HeroContent';
import MediaMetadata from 'Components/Media/MediaMetadata';
import Translate from 'Hocs/Translate';
import icons, { getIcon } from 'Utils/icons';

import styles from './styles.scss';
import messages from './messages';

const { STANDARD } = cardTypes;
const { NEXT, PREVIOUS } = icons;

const MediaOverlay = ({ album, index: initialIndex, t }) => {
  // TODO: display the initial media, fetch paginated lists of media

  const [items, setItems] = useState(album.media);
  const [item, setItem] = useState(album.media[initialIndex]);
  const [index, setIndex] = useState(initialIndex);

  useEffect(() => {
  }, [items]);

  useEffect(() => {
    setItem(items[index]);
  }, [index]);

  const lastIndex = items.length - 1;
  const hidePrev = index === 0;
  const hideNext = index === lastIndex;

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <HeroContent media={item} className={styles.heroContent} />
        <button
          className={classnames('rtlTransform', styles.navButton, styles.prev, {
            [styles.hidden]: hidePrev,
          })}
          type="button"
          aria-label={t('previous')}
          onClick={() => {
            const newIndex = index - 1 >= 0 ? index - 1 : 0;
            setIndex(newIndex);
            console.log('back', newIndex);
          }}
        >
          {getIcon({ type: PREVIOUS })}
        </button>
        <button
          className={classnames('rtlTransform', styles.navButton, styles.next, {
            [styles.hidden]: hideNext,
          })}
          type="button"
          aria-label={t('next')}
          onClick={() => {
            const newIndex = index < lastIndex ? index + 1 : lastIndex;
            setIndex(newIndex);
            console.log('next', newIndex);
          }}
        >
          {getIcon({ type: NEXT })}
        </button>
      </div>

      <Card type={STANDARD} className={styles.metadata}>
        <MediaMetadata album={album} media={item} />
      </Card>
    </div>
  );
};

MediaOverlay.propTypes = {
  index: PropTypes.number.isRequired,
  album: PropTypes.shape({
    // album: PropTypes.number.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(MediaOverlay);
