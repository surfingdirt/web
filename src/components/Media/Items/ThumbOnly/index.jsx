import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import MediaThumb from 'Components/Media/MediaThumb';

import { MediaType } from 'Utils/types';

import styles from './styles.scss';

const ThumbOnly = ({ className, item }) => {
  const {
    id,
    mediaType,
    title: { text: title },
    thumbs,
  } = item;
  const attrs = { className: classnames(styles.link, className), id, mediaType, title, thumbs };

  return <MediaThumb {...attrs} objectFit />;
};

ThumbOnly.propTypes = {
  className: PropTypes.string,
  item: MediaType.isRequired,
};

ThumbOnly.defaultProps = {
  className: null,
};

export default ThumbOnly;
