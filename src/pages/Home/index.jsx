/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import HOMEPAGE from 'Apollo/queries/home3.gql';
import AlbumPreview from 'Components/Album/AlbumPreview';
import MoreAlbums from 'Components/Album/MoreAlbums';
import Card, { cardTypes } from 'Components/Card';
import DataRenderer from 'Components/DataRenderer';
import Heading, { headingTypes } from 'Components/Heading';
import Logo, { logoTypes } from 'Components/Logo';
import Paragraph from 'Components/Paragraph';
import Translate from 'Hocs/Translate';
import coverImage from 'Images/home-cover-s.jpg';
import AppContext from '~/contexts';
import { AlbumConstants } from 'Utils/data';

import messages from './messages';
import styles from './styles.scss';

const { STANDARD } = cardTypes;
const { PRIMARY, SECONDARY } = headingTypes;
const { NO_TEXT } = logoTypes;

const { ALBUM_COUNT, ITEM_COUNT } = AlbumConstants.HOME;

class Home extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;
    const { galleryAlbumId } = this.context;

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
              <Helmet>
                <title>Surfing Dirt</title>
              </Helmet>

              <div className={styles.coverCard}>
                <Heading type={PRIMARY} className={styles.title}>
                  {t('title')}
                </Heading>
                <Logo type={NO_TEXT} className={styles.splashLogo} title="" />
                <div
                  style={{ backgroundImage: `url(${coverImage})` }}
                  className={styles.coverImage}
                />
              </div>
              <Card type={STANDARD}>
                <details className={styles.intro}>
                  <summary className={styles.introSummary}>
                    <Paragraph className={styles.introParagraph} dataContent={t('more')}>
                      {t('paragraph1a')}
                    </Paragraph>
                  </summary>

                  <Paragraph withDropCap className={styles.columns}>
                    {t('paragraph1b')}
                  </Paragraph>

                  <Heading type={SECONDARY} className={styles.title2}>
                    {t('title2')}
                  </Heading>
                  <Paragraph className={styles.columns}>{t('paragraph2')}</Paragraph>

                  <Heading type={SECONDARY}>{t('title3')}</Heading>
                  <Paragraph className={styles.columns}>{t('paragraph3')}</Paragraph>
                </details>
              </Card>

              <AlbumPreview album={galleryAlbum} />

              {listAlbums.map((album) => (
                <AlbumPreview album={album} key={album.id} showAttribution />
              ))}

              <div className={styles.albumsButtonWrapper}>
                <MoreAlbums label={t('moreAlbums')} />
              </div>
            </div>
          );
        }}
      />
    );
  }
}

export default Translate(messages)(Home);
