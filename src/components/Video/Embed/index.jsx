import React from 'react';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate/index';

import messages from './messages';
import styles from './styles.scss';

const VideoEmbed = ({ height, t, url, width }) => {
  const wrapperStyle = {
    paddingTop: `${(100 * height) / width}%`,
  };
  const videoStyle = {};

  return (
    <div className={styles.videoWrapper} style={wrapperStyle}>
      <iframe
        className={styles.video}
        style={videoStyle}
        title={t('videoContent')}
        src={url}
        allowFullScreen
      />
    </div>
  );
};

VideoEmbed.propTypes = {
  height: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default Translate(messages)(VideoEmbed);
