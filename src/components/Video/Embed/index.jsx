import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate/index';

import messages from './messages';
import styles from './styles.scss';

const VideoEmbed = ({ className, height, mediaSubType, t, url, width }) => {
  const wrapperStyle = {};
  const videoStyle = {};
  const attrs = {};
  const classNames = classnames(styles.videoWrapper, className);

  return (
    <div className={classNames}>
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
