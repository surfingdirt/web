import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ResponsiveImage from 'Components/ResponsiveImage/index';
import icons, { getIcon } from 'Utils/icons';
import { photoRoute, videoRoute } from 'Utils/links';
import { mediaTypes } from 'Utils/media';

import styles from './styles.scss';

const { PHOTO } = mediaTypes;
const { PLAY } = icons;

// TODO: refine this after settling on a design, as this will guide which image size loads.
const sizes = `(max-width:320px) 90px, (min-width:321px) 100px, (min-width:1024px) 150px`;

export default class MediaThumb extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    mediaType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { className, id, mediaType, title, thumbs } = this.props;
    const to = mediaType === PHOTO ? photoRoute(id) : videoRoute(id);
    const responsiveImage = <ResponsiveImage alt={title} images={thumbs} sizes={sizes} />;
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
