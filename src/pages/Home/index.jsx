/* eslint-disable import/prefer-default-export */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import HOMEPAGE from 'Apollo/queries/home.gql';
import AlbumPreview from 'Components/AlbumPreview';
import Card, { cardTypes } from 'Components/Card';
import Paragraph from 'Components/Paragraph';
import DataRenderer from 'Components/DataRenderer';
import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { STANDARD } = cardTypes;

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
              <Card title={t('title')} type={STANDARD}>
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
                  <Paragraph>{t('paragraph2')}</Paragraph>
                  <Paragraph>{t('paragraph3')}</Paragraph>
                  <Paragraph>{t('paragraph4')}</Paragraph>
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
