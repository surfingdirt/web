import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import ThumbOnly from 'Components/Media/Items/ThumbOnly';

import styles from './styles.scss';

const MAX_MOSAIC_CELL_COUNT = 7;

const Mosaic = ({ album, media }) => {
  const cellCount = media.length >= MAX_MOSAIC_CELL_COUNT ? MAX_MOSAIC_CELL_COUNT : media.length;
  const layoutClassName = `grid-${cellCount}-items`;

  return (
    <ul className={classnames(styles.mosaic, styles[layoutClassName])}>
      {media.slice(0, cellCount).map((item, index) => {
        const attrs = {
          album,
          className: styles[`item${index + 1}`],
          index,
          item,
          media,
        };

        return <ThumbOnly key={item.id} {...attrs} />;
      })}
    </ul>
  );
};

Mosaic.propTypes = {
  album: PropTypes.objectOf(PropTypes.any).isRequired,
  media: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Mosaic;
