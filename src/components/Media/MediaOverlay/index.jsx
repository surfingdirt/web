import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import LIST_MEDIA from 'Apollo/queries/listMedia.gql';
import Card, { cardTypes } from 'Components/Card';
import HeroContent from 'Components/Media/HeroContent';
import MediaMetadata from 'Components/Media/MediaMetadata';
import Translate from 'Hocs/Translate';
import icons, { getIcon } from 'Utils/icons';

import styles from './styles.scss';
import messages from './messages';

const { STANDARD } = cardTypes;
const { NEXT, PREVIOUS } = icons;

const PRELOAD_WHEN_REMAINING_FEWER_THAN = 2;
const PAGINATION_ITEM_COUNT = 10;

const MediaOverlay = ({ album, index: initialIndex, onTitleChange, t }) => {
  // TODO: display the initial media, fetch paginated lists of media

  const [items, setItems] = useState(album.media);
  const [item, setItem] = useState(album.media[initialIndex]);
  const [index, setIndex] = useState(initialIndex);
  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    // console.log('Detected change in items', items);
  }, [items]);

  useEffect(() => {
    setItem(items[index]);
    onTitleChange(items[index].title || album.title);
  }, [index]);

  const lastIndex = items.length - 1;
  const hidePrev = index === 0;
  const hideNext = index === lastIndex;

  const { data, error, fetchMore } = useQuery(LIST_MEDIA, {
    variables: {
      albumId: album.id,
      startItem: 0,
      countItems: PAGINATION_ITEM_COUNT,
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <HeroContent
          media={item}
          className={styles.heroContent}
          fixedHeightClassName={styles.fixedHeight}
        />
        <button
          className={classnames('rtlTransform', styles.navButton, styles.prev, {
            [styles.hidden]: hidePrev,
          })}
          type="button"
          aria-label={t('previous')}
          onClick={() => {
            setIndex(index - 1 >= 0 ? index - 1 : 0);
          }}
        >
          <div className={styles.buttonIcon}>{getIcon({ type: PREVIOUS })}</div>
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

            if (index >= lastIndex - PRELOAD_WHEN_REMAINING_FEWER_THAN) {
              if (reachedEnd) {
                return;
              }

              fetchMore({
                variables: {
                  albumId: album.id,
                  startItem: lastIndex + 1,
                  countItems: PAGINATION_ITEM_COUNT,
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
          }}
        >
          <div className={styles.buttonIcon}>{getIcon({ type: NEXT })}</div>
        </button>
      </div>

      <Card type={STANDARD} className={styles.metadata}>
        <MediaMetadata album={album} media={item} />
      </Card>
    </div>
  );
};

MediaOverlay.propTypes = {
  album: PropTypes.shape({
    // album: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(MediaOverlay);
