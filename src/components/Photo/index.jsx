import React from 'react';
import PropTypes from 'prop-types';

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

const Photo = ({ alt, className, images, sizes }) => {
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
    className,
    src,
  };

  if (sizes) {
    attrs.sizes = sizes;
  }

  return (
    <picture>
      {sources.map(({ mime, srcSet }) => (
        <source key={mime} type={mime} srcSet={srcSet} />
      ))}
      <img {...imgAttrs} />
    </picture>
  );
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
