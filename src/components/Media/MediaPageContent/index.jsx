import React, { Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import CommentList from 'Components/Comment/List';
import HeroContent from 'Components/Media/HeroContent';
import MediaMetadata from 'Components/Media/MediaMetadata';
import Card, { cardTypes } from 'Components/Widgets/Card';
import Separator from 'Components/Widgets/Separator';
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
        <MediaMetadata
          album={media.album}
          media={media}
          className={styles.metadata}
          directLink={false}
        />
        <Separator />
        <CommentList className={classnames(styles.comments)} comments={comments} />
      </Card>
    </Fragment>
  );
};

MediaPageContent.propTypes = {
  comments: PropTypes.arrayOf(CommentType).isRequired,
  media: PropTypes.shape().isRequired,
};

export default MediaPageContent;
