import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const INITIAL = 'initial';

const MEDIUM = 'MEDIUM';
const JPG = 'JPG';
const WEBP = 'WEBP';

const mimeTypes = {
  [JPG]: 'image/jpg',
  [WEBP]: 'image/webp',
};

const findDefaultImage = (list) => list.find((i) => i.size === MEDIUM && i.type === JPG);

const buildListsByType = (list) =>
  list.reduce((acc, { url, width, type }) => {
    if (!acc[type]) {
      acc[type] = {
        mime: mimeTypes[type],
        images: {},
      };
    }

    const { images } = acc[type];

    if (images[width]) {
      return acc;
    }

    images[width] = url;
    return acc;
  }, {});

const ResponsiveImage = ({ alt, className, images, maxHeight, objectFit, sizes,}) => {
  const { url: src, width: aspectRatioWidth, height: aspectRatioHeight } = findDefaultImage(images);

  const imagesByType = buildListsByType(images);

  const sources = Object.values(imagesByType).map(({ mime, images: list }) => {
    const srcSet = Object.entries(list)
      .map(([width, url]) => `${url} ${width}w`)
      .join(', ');
    return { mime, srcSet };
  });

  // Enforce height by setting a max-width / aspectRatio
  const style = {};
  if (maxHeight != INITIAL) {
    styles.maxWidth = `calc(${maxHeight}vh * ${aspectRatioWidth} / ${aspectRatioHeight})`;
  }

  const imgAttrs = {
    alt,
    className: classnames(styles.img, className),
    src,
    style,
  };

  if (sizes) {
    imgAttrs.sizes = sizes;
  }

  return (
    <picture className={objectFit ? styles.objectFit : null}>
      {sources.map(({ mime, srcSet }) => (
        <source key={mime} type={mime} srcSet={srcSet} />
      ))}
      <img {...imgAttrs} />
    </picture>
  );
};

ResponsiveImage.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      height: PropTypes.number.isRequired,
      size: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  objectFit: PropTypes.bool,
  sizes: PropTypes.string,
};

ResponsiveImage.defaultProps = {
  className: '',
  maxHeight: 75,
  objectFit: false,
  sizes: null,
};

export default ResponsiveImage;
