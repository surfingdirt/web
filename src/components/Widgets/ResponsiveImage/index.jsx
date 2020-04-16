import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const INITIAL = 'initial';

const CONTAIN = 'contain';
const COVER = 'cover';

const MEDIUM = 'MEDIUM';
const JPG = 'JPG';
const WEBP = 'WEBP';

const mimeTypes = {
  [JPG]: 'image/jpg',
  [WEBP]: 'image/webp',
};

const findDefaultImage = (list) => list.find((i) => i.size === MEDIUM && i.type === JPG);
const findLargestImageWidth = (list) =>
  list.reduce((acc, i) => {
    return Math.max(acc, i.width);
  }, 0);

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

const ResponsiveImage = ({
  alt,
  className,
  fixedHeightClassName,
  images,
  maxHeight,
  objectFit,
  sizes,
  wrapperClassName,
}) => {
  const { url: src, width: aspectRatioWidth, height: aspectRatioHeight } = findDefaultImage(images);
  const maxWidth = findLargestImageWidth(images);

  const imagesByType = buildListsByType(images);

  const sources = Object.values(imagesByType).map(({ mime, images: list }) => {
    const srcSet = Object.entries(list)
      .map(([width, url]) => `${url} ${width}w`)
      .join(', ');
    return { mime, srcSet };
  });

  const style = {};
  let classNames;
  if (fixedHeightClassName) {
    classNames = classnames(styles.img, className, fixedHeightClassName);
  } else {
    classNames = classnames(styles.img, className);
    // Enforce height by setting a max-width / aspectRatio
    if (maxHeight !== INITIAL) {
      style.maxWidth = `${maxWidth}px`;
    }
  }

  const imgAttrs = {
    alt,
    className: classNames,
    src,
    style,
    width: aspectRatioWidth,
    height: aspectRatioHeight,
  };

  if (sizes) {
    imgAttrs.sizes = sizes;
  }

  let objectFitClass;
  switch (objectFit) {
    case CONTAIN:
      objectFitClass = classnames(styles.objectFit, styles.objectFitContain);
      break;
    case COVER:
      objectFitClass = classnames(styles.objectFit, styles.objectFitCover);
      break;
    default:
      objectFitClass = null;
      break;
  }

  return (
    <picture className={classnames(styles.picture, objectFitClass, wrapperClassName)}>
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
  fixedHeightClassName: PropTypes.string,
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
  objectFit: PropTypes.string,
  sizes: PropTypes.string,
  wrapperClassName: PropTypes.string,
};

ResponsiveImage.defaultProps = {
  className: null,
  fixedHeightClassName: null,
  maxHeight: 75,
  objectFit: null,
  sizes: null,
  wrapperClassName: null,
};

export default ResponsiveImage;
