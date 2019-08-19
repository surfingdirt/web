import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card, { cardTypes } from 'Components/Card';
import Paragraph from 'Components/Paragraph';
import ResponsiveImage from 'Components/ResponsiveImage';
import Translate from 'Hocs/Translate';
import { albumRoute, userRoute } from 'Utils/links';
import { mediaTypes } from 'Utils/media';

import messages from './messages';
import styles from './styles.scss';

const { HERO } = cardTypes;
const { PHOTO, VIDEO } = mediaTypes;

const getHeroContent = (media, mediaType, t) => {
  let heroContent;

  if (mediaType === VIDEO) {
    const { embedUrl, width, height } = media;

    const wrapperStyle = {
      paddingTop: `${(100 * height) / width}%`,
    };
    const videoStyle = {};

    heroContent = (
      <div className={styles.videoWrapper} style={wrapperStyle}>
        <iframe
          className={styles.video}
          style={videoStyle}
          title={t('videoContent')}
          src={embedUrl}
        />
      </div>
    );
  } else {
    const { images } = media;
    heroContent = <ResponsiveImage alt="" className={styles.photo} images={images} />;
  }

  return heroContent;
};

const MediaPageContent = (props) => {
  const { media, mediaType, t } = props;
  const {
    album: { id: albumId, title: albumTitle },
    description,
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
