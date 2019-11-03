import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import AutoLink from 'Components/AutoLink';
import Card, { cardTypes } from 'Components/Card';
import HeroContent from 'Components/Media/HeroContent';
import MediaMetadata from 'Components/Media/MediaMetadata';
import { getBiggestMediaImageUrl } from 'Utils/media';
import { CommentType } from 'Utils/types';

import styles from './styles.scss';

const { HERO } = cardTypes;

const MediaPageContent = (props) => {
  const { comments, media } = props;
  const {
    album: { title: albumTitle },
    description,
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
        <MediaMetadata album={media.album} media={media} directLink={false} />
        <ul className={styles.comments}>
          {comments.map(({ content, id: commentId }) => (
            <li key={commentId}>
              <AutoLink ugc>{content}</AutoLink>
            </li>
          ))}
        </ul>
      </Card>
    </Fragment>
  );
};

MediaPageContent.propTypes = {
  comments: PropTypes.arrayOf(CommentType).isRequired,
  media: PropTypes.shape().isRequired,
};

export default MediaPageContent;
