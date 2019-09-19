import React from 'react';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate/index';

import messages from './messages';
import styles from './styles.scss';

const VideoEmbed = ({ height, mediaSubType, t, url, width }) => {
  const wrapperStyle = {};
  const videoStyle = {};
  const attrs = {};
  let wrapperClassName;
  let className;

  // if (mediaSubType === 'FACEBOOK') {
  // } else {
  // }

  wrapperClassName = styles.videoWrapper;
  className = styles.video;
  wrapperStyle.paddingTop = `${(100 * height) / width}%`;

  return (
    <div className={wrapperClassName} style={wrapperStyle}>
      <iframe
        className={className}
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
  height: PropTypes.number.isRequired,
  mediaSubType: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default Translate(messages)(VideoEmbed);
