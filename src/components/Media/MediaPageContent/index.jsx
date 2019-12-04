import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Card, { cardTypes } from 'Components/Card';
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

const getHeroContent = (media, mediaType, t) => {
  let heroContent;
  const {
    album: { title: albumTitle },
    description,
    title,
  } = media;

  const image = getBiggestMediaImageUrl(media);
  if (mediaType === VIDEO) {
    const { embedUrl, height, width, mediaSubType } = media;
    heroContent = (
      <Fragment>
        <Helmet>
          <title>{title || albumTitle}</title>
          <meta property="og:title" content={title || albumTitle} />
          {description && <meta property="og:description" content={description} />}
          {description && <meta property="description" content={description} />}
          {image && <meta property="og:image" content={image} />}
        </Helmet>
        <VideoEmbed url={embedUrl} height={height} mediaSubType={mediaSubType} width={width} />
      </Fragment>
    );
  } else {
    const { images } = media;

    heroContent = (
      <Fragment>
        <Helmet>
          <title>{title || albumTitle}</title>
          <meta property="og:title" content={title || albumTitle} />
          {description && <meta property="og:description" content={description} />}
          {description && <meta property="description" content={description} />}
          {image && <meta property="og:image" content={image} />}
        </Helmet>
        <ResponsiveImage alt="" images={images} />
      </Fragment>
    );
  }

  return heroContent;
};

const MediaPageContent = (props) => {
  const { media, t } = props;
  const {
    album: { id: albumId, title: albumTitle },
    description,
    mediaType,
    submitter: { userId, username },
    title,
  } = media;

  const heroContent = getHeroContent(media, mediaType, t);

  return (
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
  );
};

MediaPageContent.propTypes = {};

export default Translate(messages)(MediaPageContent);
