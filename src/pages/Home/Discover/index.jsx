/* eslint-disable import/prefer-default-export */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import HOMEPAGE from 'Apollo/queries/home2.gql';
import AlbumPreview from 'Components/Album/AlbumPreview';
import MoreAlbums from 'Components/Album/MoreAlbums';
import DataRenderer from 'Components/Widgets/DataRenderer';
import Translate from 'Hocs/Translate';
import { AlbumConstants } from 'Utils/data';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { ALBUM_COUNT, ITEM_COUNT } = AlbumConstants.HOME;

const Discover = ({ t }) => {
  const { galleryAlbumId } = useContext(AppContext);

  return (
    <DataRenderer
      query={HOMEPAGE}
      variables={{
        galleryAlbumId,
        count: ALBUM_COUNT,
        countItems: ITEM_COUNT,
        skipAlbums: [galleryAlbumId],
      }}
      render={(data) => {
        const { album: galleryAlbum, listAlbums } = data;
        return (
          <div className={styles.wrapper}>
            <AlbumPreview album={galleryAlbum} />

            {listAlbums.map((album) => (
              <AlbumPreview album={album} key={album.id} showAttribution />
            ))}

            <div className={styles.albumsButtonWrapper}>
              <MoreAlbums label={t('moreAlbums')} buttonLabel={t('goToAlbums')} />
            </div>
          </div>
        );
      }}
    />
  );
};

Discover.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Discover);
