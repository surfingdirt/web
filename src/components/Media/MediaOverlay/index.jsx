import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import LIST_MEDIA from 'Apollo/queries/listMedia.gql';
import Card, { cardTypes } from 'Components/Card';
import HeroContent from 'Components/Media/HeroContent';
import MediaMetadata from 'Components/Media/MediaMetadata';
import Translate from 'Hocs/Translate';
import icons, { getIcon } from 'Utils/icons';
import { RIGHT, LEFT } from 'Utils/keycodes';

import styles from './styles.scss';
import messages from './messages';

const { STANDARD } = cardTypes;
const { NEXT, PREVIOUS } = icons;

const LTR = 'ltr';

const PRELOAD_WHEN_REMAINING_FEWER_THAN = 2;

const MediaOverlay = ({ album, media, index: initialIndex, onTitleChange, countItems, t }) => {
  const [items, setItems] = useState(media);
  const [lastIndex, setlastIndex] = useState(items.length - 1);
  const [item, setItem] = useState(media[initialIndex]);
  const [index, setIndex] = useState(initialIndex);
  const [reachedEnd, setReachedEnd] = useState(false);
  const wrapperRef = useRef(null);
  useEffect(() => {
    wrapperRef.current.focus();
  }, [initialIndex]);

  useEffect(() => {
    setlastIndex(items.length - 1);
  }, [items]);

  useEffect(() => {
    setItem(items[index]);
    onTitleChange(items[index].title || album.title);
  }, [index]);

  const hidePrev = index === 0;
  const hideNext = index === lastIndex;

  const { data, error, fetchMore } = useQuery(LIST_MEDIA, {
    variables: {
      albumId: album.id,
      startItem: 0,
      countItems,
    },
  });

  if (error) {
    console.error('Error while loading initial item list', error);
  }

  useEffect(() => {
    if (data) {
      setItems([...data.listMedia]);
    }
  }, [data]);

  const goNext = () => {
    const newIndex = index < lastIndex ? index + 1 : lastIndex;
    setIndex(newIndex);

    if (index >= lastIndex - PRELOAD_WHEN_REMAINING_FEWER_THAN) {
      if (reachedEnd) {
        return;
      }

      fetchMore({
        variables: {
          albumId: album.id,
          startItem: lastIndex + 1,
          countItems,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          if (fetchMoreResult.listMedia.length === 0) {
            setReachedEnd(true);
            return prev;
          }
          const newItems = [...items, ...fetchMoreResult.listMedia];
          setItems(newItems);

          return newItems;
        },
      });
    }
  };
  const goPrev = () => {
    setIndex(index - 1 >= 0 ? index - 1 : 0);
  };

  return (
    <div
      ref={wrapperRef}
      tabIndex="-1"
      className={styles.wrapper}
      onKeyDown={(e) => {
        switch (e.keyCode) {
          case RIGHT:
            (document.dir === LTR ? goNext : goPrev)();
            break;
          case LEFT:
            (document.dir === LTR ? goPrev : goNext)();
            break;
          default:
            return;
        }
        e.preventDefault();
      }}
    >
      <div className={styles.heroWrapper}>
        <div className={styles.hero}>
          <HeroContent media={item} className={styles.heroContent} />
          <button
            className={classnames('rtlTransform', styles.navButton, styles.prev, {
              [styles.hidden]: hidePrev,
            })}
            type="button"
            aria-label={t('previous')}
            onClick={goPrev}
          >
            <div className={styles.buttonIcon}>{getIcon({ type: PREVIOUS })}</div>
          </button>
          <button
            className={classnames('rtlTransform', styles.navButton, styles.next, {
              [styles.hidden]: hideNext,
            })}
            type="button"
            aria-label={t('next')}
            onClick={goNext}
          >
            <div className={styles.buttonIcon}>{getIcon({ type: NEXT })}</div>
          </button>
        </div>
      </div>

      <Card type={STANDARD} className={styles.metadata}>
        <MediaMetadata album={album} media={item} />
      </Card>

      <Card type={STANDARD} className={styles.comments}>
        <p>Insert comments here</p>
      </Card>
    </div>
  );
};

MediaOverlay.propTypes = {
  album: PropTypes.shape({}).isRequired,
  countItems: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  media: PropTypes.shape({}).isRequired,
  onTitleChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(MediaOverlay);
