import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { InlineSpinner } from 'Components/Widgets/Spinner';
import Translate from 'Hocs/Translate';
import { MEDIA_SUBTYPES_VIDEO } from 'Utils/media';

import messages from './messages';
import styles from './styles.scss';

const { INSTAGRAM } = MEDIA_SUBTYPES_VIDEO;

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
  const classNames = classnames(styles.videoWrapper, className, {
    [styles.instagram]: mediaSubType.toLowerCase() === INSTAGRAM,
  });
  return (
    <div className={classNames}>
      <iframe
        referrerPolicy="no-referrer"
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
  t: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

VideoEmbed.defaultProps = {
  className: null,
  loading: false,
};

export default Translate(messages)(VideoEmbed);
