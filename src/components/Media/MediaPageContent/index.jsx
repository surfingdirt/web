import React, { Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import CommentListFetcher from 'Components/Comment/ListFetcher';
import { parentTypes } from 'Utils/comments';
import HeroContent from 'Components/Media/HeroContent';
import MediaMetadata from 'Components/Media/MediaMetadata';
import Card, { cardTypes } from 'Components/Widgets/Card';
import Separator from 'Components/Widgets/Separator';
import { getBiggestMediaImageUrl } from 'Utils/media';

import styles from './styles.scss';

const { HERO } = cardTypes;
const { PHOTO: PHOTO_COMMENT, VIDEO: VIDEO_COMMENT } = parentTypes;

const MediaPageContent = (props) => {
  const { media } = props;
  const {
    album: {
      title: { text: albumTitle },
    },
    description: { text: description },
    id,
    mediaType,
    title: { text: title },
  } = media;

  const commentType = mediaType.toLowerCase();
  if (![PHOTO_COMMENT, VIDEO_COMMENT].includes(commentType)) {
    throw new Error(`Unsupported media type '${mediaType}'`);
  }
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
        <MediaMetadata
          album={media.album}
          media={media}
          className={styles.metadata}
          isOverlay={false}
        />
        <Separator />
        <CommentListFetcher
          className={classnames(styles.comments)}
          itemId={id}
          itemType={commentType}
        />
      </Card>
    </Fragment>
  );
};

MediaPageContent.propTypes = {
  media: PropTypes.shape().isRequired,
};

export default MediaPageContent;
