import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ResponsiveImage from 'Components/Widgets/ResponsiveImage/index';
import Translate from 'Hocs/Translate';
import icons, { getIcon } from 'Utils/icons';
import { photoRoute, videoRoute } from 'Utils/links';
import { mediaTypes } from 'Utils/media';

import messages from './messages';
import styles from './styles.scss';

const { PHOTO } = mediaTypes;
const { VIDEO } = icons;

// TODO: refine this after settling on a design, as this will guide which image size loads.
const sizes = `(max-width:320px) 90px, (min-width:321px) 100px, (min-width:1024px) 150px`;

class MediaThumb extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    maxWidth: PropTypes.string,
    mediaType: PropTypes.string.isRequired,
    objectFit: PropTypes.bool,
    onClickCapture: PropTypes.func,
    t: PropTypes.func.isRequired,
    target: PropTypes.string,
    title: PropTypes.string,
    to: PropTypes.string,
    thumbs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  static defaultProps = {
    className: null,
    maxWidth: null,
    objectFit: false,
    onClickCapture: null,
    target: null,
    title: null,
    to: null,
  };

  render() {
    const {
      className,
      id,
      maxWidth,
      mediaType,
      objectFit,
      onClickCapture,
      t,
      target,
      title,
      to,
      thumbs,
    } = this.props;

    const alt = title || t('thumbAlt');
    const responsiveImage = (
      <ResponsiveImage alt={alt} images={thumbs} sizes={sizes} objectFit={objectFit} />
    );
    const style = maxWidth ? { maxWidth: `${maxWidth}px` } : {};

    const content =
      mediaType === PHOTO ? (
        responsiveImage
      ) : (
        <div className={styles.videoWrapper}>
          {responsiveImage}
          <div className={styles.videoOverlay}>
            {getIcon({ type: VIDEO, label: null, className: styles.playIcon })}
          </div>
        </div>
      );

    const attrs = {
      className: classnames(className, { [styles.objectFit]: objectFit }),
      title,
      style,
      target,
    };
    if (onClickCapture) {
      attrs.onClickCapture = onClickCapture;
    }
    let Tag;
    if (to) {
      Tag = 'a';
      attrs.href = to;
    } else {
      Tag = Link;
      attrs.to = mediaType === PHOTO ? photoRoute(id) : videoRoute(id);
    }
    return <Tag {...attrs}>{content}</Tag>;
  }
}

export default Translate(messages)(MediaThumb);
