import React, { useContext, useState } from 'react';
import YouTube from 'react-youtube';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import { InlineSpinner } from 'Components/Widgets/Spinner';
import Translate from 'Hocs/Translate';
import { MEDIA_SUBTYPES_VIDEO } from 'Utils/media';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { INSTAGRAM, YOUTUBE } = MEDIA_SUBTYPES_VIDEO;

// Height of the header in the embed in pixels:
const INSTAGRAM_ADDITIONAL_HEIGHT = 54;

const YouTubeEmbed = ({ fullUrl, errorMessages, videoId }) => {
  const { baseUrl } = useContext(AppContext);
  const [error, setError] = useState(null);

  // https://developers.google.com/youtube/player_parameters#enablejsapi
  const options = {
    enablejsapi: 1,
    origin: baseUrl,
    rel: 0,
  };
  const onError = (e) => {
    console.error('YouTube playback error', e);
    setError(e);
  };

  if (error) {
    return (
      <div className={classnames(styles.video, styles.error)}>
        <div>
          <p>{errorMessages[0]}</p>
          <a target="_blank" href={fullUrl} rel="noopener noreferrer">
            {errorMessages[1]}
          </a>
        </div>
      </div>
    );
  }

  return <YouTube videoId={videoId} opts={options} className={styles.video} onError={onError} />;
};

YouTubeEmbed.propTypes = {
  fullUrl: PropTypes.string.isRequired,
  errorMessages: PropTypes.arrayOf(PropTypes.string).isRequired,
  videoId: PropTypes.string.isRequired,
};

const VideoEmbed = ({
  className,
  height,
  loading,
  mediaSubType,
  t,
  url,
  vendorKey,
  vendorUrl,
  width,
}) => {
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

  const isInstagram = mediaSubType.toLowerCase() === INSTAGRAM;
  const isYouTube = mediaSubType.toLowerCase() === YOUTUBE;

  const classNames = classnames(styles.videoWrapper, className, {
    [styles.instagram]: isInstagram,
  });
  let style = null;
  if (isInstagram) {
    const percent = `${(height / width) * 100}%`;
    const paddingTop = `calc(${percent} + ${INSTAGRAM_ADDITIONAL_HEIGHT}px)`;

    style = { paddingTop };
  }

  let content;
  if (isYouTube) {
    content = (
      <YouTubeEmbed
        videoId={vendorKey}
        fullUrl={vendorUrl}
        errorMessages={[t('error1'), t('error2')]}
      />
    );
  } else {
    content = (
      <iframe
        referrerPolicy="no-referrer"
        className={styles.video}
        title={t('videoContent')}
        src={url}
        allowFullScreen
        {...attrs}
      />
    );
  }

  return (
    <div className={classNames} style={style}>
      {content}
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
  vendorKey: PropTypes.string.isRequired,
  vendorUrl: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

VideoEmbed.defaultProps = {
  className: null,
  loading: false,
};

export default Translate(messages)(VideoEmbed);
