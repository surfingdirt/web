import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Card, { cardTypes } from 'Components/Card';
import HeroContent from 'Components/Media/HeroContent';
import Paragraph from 'Components/Paragraph/index';
import ResponsiveImage from 'Components/ResponsiveImage';
import VideoEmbed from 'Components/Video/Embed';
import Translate from 'Hocs/Translate/index';
import { albumRoute, userRoute } from 'Utils/links';
import { getBiggestMediaImageUrl, mediaTypes } from 'Utils/media';

import messages from './messages';
import styles from './styles.scss';

const { HERO } = cardTypes;
const { VIDEO } = mediaTypes;

const MediaPageContent = (props) => {
  const { media, t } = props;
  const {
    album: { id: albumId, title: albumTitle },
    description,
    submitter: { userId, username },
    title,
  } = media;
  const image = getBiggestMediaImageUrl(media);

  const heroContent = <HeroContent media={media} />;

  return (
    <Fragment>
      <Helmet>
        <title>{title || albumTitle}</title>
        {description && <meta property="og:description" content={description} />}
        {description && <meta property="description" content={description} />}
        {image && <meta property="og:image" content={image} />}
      </Helmet>
      <Card title={title} type={HERO} heroContent={heroContent}>
        <div>
          {description && <Paragraph>{description}</Paragraph>}
          <div className={styles.metadataItem}>
            <span className={styles.metadataItemName}>{t('postedBy')}</span>
            <Link to={userRoute(userId)}>{username}</Link>
          </div>

          <div className={styles.metadataItem}>
            <span className={styles.metadataItemName}>{t('inAlbum')}</span>
            <Link to={albumRoute(albumId)}>{albumTitle}</Link>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

MediaPageContent.propTypes = {
  media: PropTypes.shape().isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(MediaPageContent);
