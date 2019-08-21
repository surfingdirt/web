import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ResponsiveImage from 'Components/ResponsiveImage/index';
import Translate from 'Hocs/Translate';
import icons, { getIcon } from 'Utils/icons';
import { photoRoute, videoRoute } from 'Utils/links';
import { mediaTypes } from 'Utils/media';

import messages from './messages';
import styles from './styles.scss';

const { PHOTO } = mediaTypes;
const { PLAY } = icons;

// TODO: refine this after settling on a design, as this will guide which image size loads.
const sizes = `(max-width:320px) 90px, (min-width:321px) 100px, (min-width:1024px) 150px`;

class MediaThumb extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    mediaType: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
    title: PropTypes.string,
    thumbs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  static defaultProps = {
    className: null,
    title: null,
  };

  render() {
    const { className, id, mediaType, t, title, thumbs } = this.props;
    const to = mediaType === PHOTO ? photoRoute(id) : videoRoute(id);
    const alt = title || t('thumbAlt');
    const responsiveImage = <ResponsiveImage alt={alt} images={thumbs} sizes={sizes} />;
    return (
      <Link className={className} to={to} title={title}>
        {mediaType === PHOTO ? (
          responsiveImage
        ) : (
          <div className={styles.videoWrapper}>
            {responsiveImage}
            <div className={styles.videoOverlay}>
              {getIcon({ type: PLAY, label: null, className: styles.playIcon })}
            </div>
          </div>
        )}
      </Link>
    );
  }
}

export default Translate(messages)(MediaThumb);