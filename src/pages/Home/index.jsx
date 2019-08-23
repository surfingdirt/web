/* eslint-disable import/prefer-default-export */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import HOMEPAGE from 'Apollo/queries/home2.gql';
import AlbumPreview from 'Components/Album/AlbumPreview';
import Card, { cardTypes } from 'Components/Card';
import Heading, { headingTypes } from 'Components/Heading';
import Logo, { logoTypes } from 'Components/Logo';
import Paragraph from 'Components/Paragraph';
import DataRenderer from 'Components/DataRenderer';
import Translate from 'Hocs/Translate';
import coverImage from 'Images/home-cover-s.jpg';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { STANDARD } = cardTypes;
const { PRIMARY, SECONDARY } = headingTypes;
const { NO_TEXT } = logoTypes;

class HomeRaw extends React.Component {
  static contextType = AppContext;

  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;
    const {
      galleryAlbumId,
      login: {
        data: {
          me: { userId },
        },
      },
    } = this.context;

    const loggedIn = !!userId;

    return (
      <DataRenderer
        query={HOMEPAGE}
        variables={{ galleryAlbumId }}
        render={(data) => {
          const { album: galleryAlbum, listAlbums } = data;
          return (
            <Fragment>
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
                    <Paragraph
                      widthDropCap
                      className={styles.introParagraph}
                      dataContent={t('more')}
                    >
                      {t('paragraph1')}
                    </Paragraph>
                  </summary>

                  <Heading type={SECONDARY} className={styles.title2}>
                    {t('title2')}
                  </Heading>
                  <Paragraph>{t('paragraph2')}</Paragraph>

                  <Heading type={SECONDARY}>{t('title3')}</Heading>
                  <Paragraph>{t('paragraph3')}</Paragraph>
                </details>
              </Card>

              <AlbumPreview album={galleryAlbum} />

              {listAlbums.map((album) => (
                <AlbumPreview album={album} key={album.id} />
              ))}
            </Fragment>
          );
        }}
      />
    );
  }
}

export const Home = Translate(messages)(HomeRaw);
