import React from 'react';
import PropTypes from 'prop-types';

const MEDIUM = 'MEDIUM';
const Photo = ({ alt, className, images, sizes }) => {
  const { url: src } = images.find((i) => i.size === MEDIUM);

  const dedupedSizes = images.reduce((acc, { url, width }) => {
    acc[width] = url;
    return acc;
  }, {});
  const srcSet = Object.entries(dedupedSizes)
    .map(([width, url]) => `${url} ${width}w`)
    .join(', ');

  const attrs = {
    alt,
    className,
    src,
    srcSet,
  };

  if (sizes) {
    attrs.sizes = sizes;
  }

  return <img {...attrs} />;
};

Photo.propTypes = {
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
  sizes: PropTypes.string,
};

Photo.defaultProps = {
  className: '',
  sizes: null,
};

export default Photo;
