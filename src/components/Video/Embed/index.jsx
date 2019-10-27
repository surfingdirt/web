import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate/index';

import messages from './messages';
import styles from './styles.scss';

const VideoEmbed = ({ className, fixedHeightClassName, height, mediaSubType, t, url, width }) => {
  const wrapperStyle = {};
  const videoStyle = {};
  const attrs = {};
  let classNames;

  if (fixedHeightClassName) {
    classNames = classnames(styles.videoWrapper, className, fixedHeightClassName);
  } else {
    classNames = classnames(styles.videoWrapper, className);
    wrapperStyle.paddingTop = `${(100 * height) / width}%`;
  }

  return (
    <div className={classNames} style={wrapperStyle}>
      <iframe
        className={styles.video}
        style={videoStyle}
        title={t('videoContent')}
        src={url}
        allowFullScreen
        {...attrs}
      />
    </div>
  );
};

VideoEmbed.propTypes = {
  className: PropTypes.string,
  fixedHeightClassName: PropTypes.string,
  height: PropTypes.number.isRequired,
  mediaSubType: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

VideoEmbed.defaultProps = {
  className: null,
};

export default Translate(messages)(VideoEmbed);
