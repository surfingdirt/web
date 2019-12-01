import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { InlineSpinner } from 'Components/Widgets/Spinner';
import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const VideoEmbed = ({ className, height, loading, mediaSubType, t, url, width }) => {
  const attrs = {};

  if (loading) {
    return (
      <div className={classnames(styles.videoWrapper, styles.loading, className)}>
        <div className={classnames(styles.video, styles.loaderWrapper)}>
          <InlineSpinner negative className={styles.loader} />
        </div>
      </div>
    );
  }

  return (
    <div className={classnames(styles.videoWrapper, className)}>
      <iframe
        className={styles.video}
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
  loading: PropTypes.bool,
  mediaSubType: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

VideoEmbed.defaultProps = {
  className: null,
  loading: false,
};

export default Translate(messages)(VideoEmbed);
