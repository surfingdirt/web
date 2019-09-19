import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import ALBUM from 'Apollo/queries/album.gql';
import AlbumAddButtons from 'Components/Album/AlbumAddButtons';
import AlbumGrid from 'Components/Album/AlbumGrid';
import Attribution from 'Components/Attribution';
import Card, { cardTypes } from 'Components/Card';
import DataRenderer from 'Components/DataRenderer';
import DualContainer from 'Components/DualContainer/index';
import Menu from 'Components/Menu';
import menuStyles from 'Components/Menu/styles.scss';
import Paragraph from 'Components/Paragraph';
import { userboxSizes } from 'Components/User/Userbox';
import Translate from 'Hocs/Translate';
import { batchPhotoUploadForAlbumRoute } from 'Utils/links';
import { getFirstAlbumImageUrl } from 'Utils/media';
import AppContext from '~/contexts';
import { ALBUM_MENU } from '~/ids';

import messages from './messages';
import styles from './styles.scss';

const COUNT_ITEMS = 25;

const { STANDARD } = cardTypes;
const { SMALL } = userboxSizes;

class AlbumRaw extends React.Component {
  static propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    t: PropTypes.func.isRequired,
  };

  static contextType = AppContext;

  render() {
    const { match, t } = this.props;
    const { id: albumId } = match.params;

    return (
      <DataRenderer
        query={ALBUM}
        variables={{ id: albumId, countItems: COUNT_ITEMS }}
        render={({
          album: {
            actions: { add: userCanAdd },
            description,
            media,
            submitter,
            title,
          },
        }) => {
          const options = [];
          if (userCanAdd) {
            const batchUploadUrl = batchPhotoUploadForAlbumRoute(albumId);
            options.push(() => (
              <div className={menuStyles.menuEntry}>
                <Link to={batchUploadUrl}>{t('batchUpload')}</Link>
              </div>
            ));
          }
          const image = getFirstAlbumImageUrl(media);

          return (
            <Card type={STANDARD} title={title}>
              <Helmet>
                {title && <meta property="og:title" content={title} />}
                {description && <meta property="og:description" content={description} />}
                {image && <meta property="og:image" content={image} />}
              </Helmet>
              {userCanAdd && (
                <DualContainer>
                  <Attribution submitter={submitter} userboxSize={SMALL} short={false} />
                  <div className={styles.actionsContainer}>
                    <AlbumAddButtons albumId={albumId} />
                    {options.length > 0 && (
                      <div>
                        <Menu
                          menuId={ALBUM_MENU}
                          triggerLabel={t('albumMenuLabel')}
                          className={styles.albumMenu}
                          options={options}
                        />
                      </div>
                    )}
                  </div>
                </DualContainer>
              )}
              {description && <Paragraph>{description}</Paragraph>}
              <AlbumGrid media={media} />
            </Card>
          );
        }}
      />
    );
  }
}

export const Album = Translate(messages)(AlbumRaw);
