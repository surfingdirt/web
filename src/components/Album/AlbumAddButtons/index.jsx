import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import NavigationLink from 'Components/NavigationLink';
import Translate from 'Hocs/Translate';
import icons from 'Utils/icons';
import { newPhotoForAlbumRoute, newVideoForAlbumRoute } from 'Utils/links';

import messages from './messages';
import styles from './styles.scss';

const { PHOTO, VIDEO } = icons;

const AlbumAddButtons = ({ albumId, t }) => (
  <Fragment>
    <NavigationLink
      to={newPhotoForAlbumRoute(albumId)}
      label={t('addAPhoto')}
      icon={PHOTO}
      className={styles.addButton}
    />
    <NavigationLink
      to={newVideoForAlbumRoute(albumId)}
      label={t('addAVideo')}
      icon={VIDEO}
      className={styles.addButton}
    />
  </Fragment>
);

AlbumAddButtons.propTypes = {
  albumId: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(AlbumAddButtons);
