import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ResponsiveImage from 'Components/ResponsiveImage';
import { photoRoute, videoRoute } from 'Utils/links';
import { mediaTypes } from 'Utils/media';

import styles from './styles.scss';
const { PHOTO } = mediaTypes;

// TODO: refine this after settling on a design, as this will guide which image size loads.
const sizes = `(max-width:320px) 90px, (min-width:321px) 100px, (min-width:1024px) 150px`;

export default class MediaThumb extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    mediaType: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbs: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { className, id, mediaType, title, thumbs } = this.props;
    const to = mediaType === PHOTO ? photoRoute(id) : videoRoute(id);
    return (
      <Link className={className} to={to}>
        <ResponsiveImage alt={title} images={thumbs} sizes={sizes} />
      </Link>
    );
  }
}
