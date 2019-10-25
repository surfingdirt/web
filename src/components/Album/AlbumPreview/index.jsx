import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import AlbumAddButtons from 'Components/Album/AlbumAddButtons';
import Attribution from 'Components/Attribution';
import Card, { cardTypes } from 'Components/Card';
import { modalTypes } from 'Components/Modal';
import Empty from 'Components/Empty/index';
import Heading, { headingTypes } from 'Components/Heading';
import MediaOverlay from 'Components/Media/MediaOverlay';
import MediaThumb from 'Components/Media/MediaThumb';
import Paragraph from 'Components/Paragraph';
import Slider from 'Components/Slider';
import { userboxSizes } from 'Components/User/Userbox';
import Translate from 'Hocs/Translate';
import WithModal from 'Hocs/WithModal';
import { AlbumContributions } from 'Utils/data';
import { albumRoute } from 'Utils/links';

import messages from './messages';
import styles from './styles.scss';

const { BARE, STANDARD } = cardTypes;
const { SECONDARY } = headingTypes;
const { HERO } = modalTypes;
const { SMALLEST } = userboxSizes;

const AlbumPreview = ({
  album: {
    actions,
    albumContributions,
    description,
    id: albumId,
    itemCount,
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

  const albumUrl = albumRoute(albumId);

  if (isEmpty) {
    return (
      <Card
        type={STANDARD}
        title={albumTitle}
        titleLink={albumUrl}
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

  const sliderChildren = media.map((mediaItem) => {
    const { id, mediaType, title, thumbs } = mediaItem;
    const attrs = { id, mediaType, title, thumbs };

    const ThumbWithModal = WithModal({
      modalContent: <MediaOverlay media={mediaItem} />,
      modalTitle: title || albumTitle,
      ariaLabel: t('mediaPreviewModal'),
      type: HERO,
    })(<MediaThumb {...attrs} objectFit />);

    return (
      <div key={id} className={styles.item}>
        <ThumbWithModal />
      </div>
    );
  });

  const remaining = itemCount - media.length;
  if (remaining > 0) {
    // TODO: make this a Link. Right now, client-side caching issues are preventing that.
    sliderChildren.push(
      <a href={albumUrl} key="more" className={classnames(styles.item, styles.more)}>
        {`+${remaining}`}
      </a>,
    );
  }

  return (
    <Card className={styles.wrapper} type={BARE}>
      <Slider className={styles.items} prevClassName={styles.previous} nextClassName={styles.next}>
        {sliderChildren}
      </Slider>
      <div className={styles.contentWrapper}>
        <div className={styles.titleAndAttribution}>
          <Heading className={styles.title} type={SECONDARY} link={albumUrl}>
            {albumTitle}
          </Heading>
          <div className={styles.metadata}>
            {albumContributions === AlbumContributions.PUBLIC && (
              <span className={styles.public}>{t('public')}</span>
            )}
            {showAttribution && submitter && (
              <Attribution submitter={submitter} userboxSize={SMALLEST} />
            )}
          </div>
        </div>
        {description && (
          <Paragraph className={styles.description} withAutoLink ugc>
            {description}
          </Paragraph>
        )}
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
