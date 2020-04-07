import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import ThumbOnly from 'Components/Media/Items/ThumbOnly';

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
  const showMore = moreCountMobile || moreCountDesktop;

  return (
    <ul
      className={classnames(styles.mosaic, styles[layoutClassName], {
        [styles.showMoreDesktop]: !!moreCountDesktop,
      })}
    >
      {truncated.map((item, index) => {
        const attrs = {
          album,
          className: styles[`item${index + 1}`],
          index,
          item,
          media,
        };

        return <ThumbOnly key={item.id} {...attrs} />;
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
