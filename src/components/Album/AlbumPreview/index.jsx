import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import AlbumAddButtons from 'Components/Album/AlbumAddButtons';
import Card, { cardTypes } from 'Components/Card';
import Empty from 'Components/Empty/index';
import Heading, { headingTypes } from 'Components/Heading';
import MediaThumb from 'Components/Media/MediaThumb';
import Paragraph from 'Components/Paragraph';
import Slider from 'Components/Slider';
import Userbox, { userboxSizes } from 'Components/User/Userbox';
import Translate from 'Hocs/Translate';
import { AlbumContributions } from 'Utils/data';
import { albumRoute } from 'Utils/links';

import messages from './messages';
import styles from './styles.scss';

const { BARE, STANDARD } = cardTypes;
const { SECONDARY } = headingTypes;
const { SMALLEST } = userboxSizes;

const renderAttribution = (albumVisibility, submitter, t) => {
  return (
    <Fragment>
      <span className={styles.by}>{t('by')}</span>
      <Userbox user={submitter} size={SMALLEST} />
    </Fragment>
  );
};

const AlbumPreview = ({
  album: {
    actions,
    albumContributions,
    description,
    id: albumId,
    media,
    submitter,
    title: albumTitle,
  },
  showAttribution,
  renderIfEmpty,
  t,
}) => {
  const isEmpty = !media || media.length === 0;
  if (isEmpty && !renderIfEmpty) {
    return null;
  }

  if (isEmpty) {
    return (
      <Card
        type={STANDARD}
        title={albumTitle}
        titleLink={albumRoute(albumId)}
        headingType={SECONDARY}
        className={styles.wrapper}
      >
        <div className={styles.emptyWrapper}>
          <Empty />
          {actions.add && (
            <div className={styles.addButtons}>
              <AlbumAddButtons albumId={albumId} />
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className={styles.wrapper} type={BARE}>
      <Slider className={styles.items} prevClassName={styles.previous} nextClassName={styles.next}>
        {media.map(({ id, mediaType, title, thumbs }) => {
          const attrs = { id, mediaType, title, thumbs };
          return (
            <div key={id} className={styles.item}>
              <MediaThumb key={id} {...attrs} objectFit />
            </div>
          );
        })}
      </Slider>
      <div className={styles.contentWrapper}>
        <div className={styles.titleAndAttribution}>
          <Heading className={styles.title} type={SECONDARY} link={albumRoute(albumId)}>
            {albumTitle}
          </Heading>
          <div className={styles.metadata}>
            {albumContributions === AlbumContributions.PUBLIC && (
              <span className={styles.public}>{t('public')}</span>
            )}
            {showAttribution && renderAttribution(submitter, t)}
          </div>
        </div>
        {description && <Paragraph className={styles.description}>{description}</Paragraph>}
      </div>
    </Card>
  );
};

AlbumPreview.propTypes = {
  album: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string.isRequired,
    media: PropTypes.any,
    title: PropTypes.string.isRequired,
  }).isRequired,
  renderIfEmpty: PropTypes.bool,
  showAttribution: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

AlbumPreview.defaultProps = {
  renderIfEmpty: false,
  showAttribution: false,
};

export default Translate(messages)(AlbumPreview);
