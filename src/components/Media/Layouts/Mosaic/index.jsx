import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import MediaThumb from 'Components/Media/MediaThumb';

import styles from './styles.scss';

const MAX_MOSAIC_CELL_COUNT_DESKTOP = 7;
const MAX_MOSAIC_CELL_COUNT_MOBILE = 4;

const Mosaic = ({ album, media }) => {
  const truncated = media.slice(0, MAX_MOSAIC_CELL_COUNT_DESKTOP);

  const cellCount =
    media.length >= MAX_MOSAIC_CELL_COUNT_DESKTOP ? MAX_MOSAIC_CELL_COUNT_DESKTOP : media.length;
  const layoutClassName = `grid-${cellCount}-items`;

  const moreCountDesktop =
    media.length > MAX_MOSAIC_CELL_COUNT_DESKTOP
      ? media.length - (MAX_MOSAIC_CELL_COUNT_DESKTOP - 1)
      : 0;
  const moreCountMobile =
    media.length > MAX_MOSAIC_CELL_COUNT_MOBILE
      ? media.length - (MAX_MOSAIC_CELL_COUNT_MOBILE - 1)
      : 0;
  const showMore = !!(moreCountMobile || moreCountDesktop);

  const firstElHeight = truncated[0].thumbHeight;
  const style = truncated.length === 7 ? { gridAutoRows: `${12}vh` } : {};
  return (
    <ul
      className={classnames(styles.mosaic, styles[layoutClassName], {
        [styles.showMoreDesktop]: !!moreCountDesktop,
      })}
      style={style}
    >
      {truncated.map((item, index) => {
        const attrs = {
          className: classnames(styles.item, styles[`item${index + 1}`]),
          id: item.id,
          maxWidth: item.thumbWidth,
          mediaType: item.mediaType,
          thumbs: item.thumbs,
          title: item.title.text,
        };
        // Special case the big hero content: make it crisp even though it may be smaller
        const objectFit = index === 0 && truncated.length === 7 ? 'contain' : 'cover';

        return <MediaThumb key={item.id} {...attrs} objectFit={objectFit} />;
      })}
      {showMore && (
        <li className={styles.more}>
          {moreCountDesktop > 0 && (
            <span className={styles.moreDesktop}>{`+${moreCountDesktop}`}</span>
          )}
          {moreCountMobile > 0 && (
            <span className={styles.moreMobile}>{`+${moreCountMobile}`}</span>
          )}
        </li>
      )}
    </ul>
  );
};

Mosaic.propTypes = {
  album: PropTypes.objectOf(PropTypes.any).isRequired,
  media: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Mosaic;
