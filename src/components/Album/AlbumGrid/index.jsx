import React from 'react';
import PropTypes from 'prop-types';

import MediaThumb from 'Components/Media/MediaThumb/index';

import styles from './styles.scss';

const breakpointColumnsObj = {
  default: 5,
  1280: 4,
  960: 3,
  800: 2,
  640: 3,
  320: 2,
};

export default class AlbumGrid extends React.PureComponent {
  static propTypes = {
    media: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  };

  render() {
    const { media } = this.props;

    return (
      <div className={styles.grid}>
        {media.map((item) => {
          const { id, mediaType, title, thumbs } = item;
          const attrs = { className: styles.link, id, mediaType, title, thumbs };
          return <MediaThumb key={id} {...attrs} />;
        })}
      </div>
    );
  }
}
