import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import NavigationLink from 'Components/NavigationLink';
import Translate from 'Hocs/Translate';
import icons from 'Utils/icons';
import { newPhotoForAlbumRoute, newVideoForAlbumRoute } from 'Utils/links';

import messages from './messages';

const { PHOTO, VIDEO } = icons;

const AlbumAddButtons = ({ albumId, t }) => (
  <Fragment>
    <NavigationLink to={newPhotoForAlbumRoute(albumId)} label={t('addAPhoto')} icon={PHOTO} />
    <NavigationLink to={newVideoForAlbumRoute(albumId)} label={t('addAVideo')} icon={VIDEO} />
  </Fragment>
);

AlbumAddButtons.propTypes = {
  albumId: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(AlbumAddButtons);
