import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

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

const ResponsiveImage = ({ alt, className, images, objectFit, sizes }) => {
  const { url: src } = findDefaultImage(images);

  const imagesByType = buildListsByType(images);

  const sources = Object.values(imagesByType).map(({ mime, images: list }) => {
    const srcSet = Object.entries(list)
      .map(([width, url]) => `${url} ${width}w`)
      .join(', ');
    return { mime, srcSet };
  });

  const imgAttrs = {
    alt,
    className: classnames(styles.img, className),
    src,
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
  objectFit: PropTypes.bool,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      height: PropTypes.number.isRequired,
      size: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  sizes: PropTypes.string,
};

ResponsiveImage.defaultProps = {
  className: '',
  objectFit: false,
  sizes: null,
};

export default ResponsiveImage;
