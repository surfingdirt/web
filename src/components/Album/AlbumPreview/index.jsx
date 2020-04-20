import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import AlbumAddButtons from 'Components/Album/AlbumAddButtons';
import Attribution from 'Components/Widgets/Attribution';
import Card, { cardTypes } from 'Components/Widgets/Card';
import { modalTypes } from 'Components/Widgets/Modal';
import Empty from 'Components/Widgets/Empty/index';
import Heading, { headingTypes } from 'Components/Widgets/Heading';
import TranslateButton, { translateButtonTypes } from 'Components/Widgets/TranslateButton';
import MediaOverlay from 'Components/Media/MediaOverlay';
import MediaThumb from 'Components/Media/MediaThumb';
import Paragraph from 'Components/Widgets/Paragraph';
import Slider from 'Components/Widgets/Slider';
import { userboxSizes } from 'Components/User/Userbox';
import Translate from 'Hocs/Translate';
import WithModal from 'Hocs/WithModal';
import { AlbumContributions } from 'Utils/data';
import { albumRoute } from 'Utils/links';
import { mediaPageSize } from 'Utils/media';
import { TranslatedTextType } from 'Utils/types';
import AppContext from '~/contexts';

import messages from './messages';
import styles from './styles.scss';

const { BARE, STANDARD } = cardTypes;
const { SECONDARY } = headingTypes;
const { HERO } = modalTypes;
const { SMALLEST } = userboxSizes;
const countItems = mediaPageSize;
const { ALBUM } = translateButtonTypes;

const AlbumPreview = ({ album, locale, showAttribution, renderIfEmpty, renderSliderOnly, t }) => {
  const { features } = useContext(AppContext);

  const {
    actions,
    albumContributions,
    description: { text: description },
    id: albumId,
    itemCount,
    media,
    submitter,
    title: { locale: textLocale, original, text: albumTitle },
  } = album;
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

  const sliderChildren = media.map((mediaItem, index) => {
    const {
      id,
      thumbWidth,
      mediaType,
      title: { text: title },
      thumbs,
    } = mediaItem;
    const attrs = { id, maxWidth: thumbWidth, mediaType, title, thumbs };

    const ThumbWithModal = WithModal({
      ariaLabel: t('mediaPreviewModal'),
      className: styles.modalWrapper,
      modalContent: (
        <MediaOverlay album={album} media={album.media} countItems={countItems} index={index} />
      ),
      modalTitle: title || albumTitle,
      type: HERO,
    })(<MediaThumb {...attrs} objectFit="cover" />);

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

  // Show the button if the text is in its original form and the locale is not that of the user
  const showTranslateButton = features.translation && original && textLocale !== locale;

  const sliderContent = (
    <Slider className={styles.items} prevClassName={styles.previous} nextClassName={styles.next}>
      {sliderChildren}
    </Slider>
  );

  if (renderSliderOnly) {
    return sliderContent;
  }

  return (
    <Card className={styles.wrapper} type={BARE}>
      {sliderContent}
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
            {showTranslateButton && (
              <Fragment>
                <span aria-hidden className={styles.separator}>
                  &bull;
                </span>
                <TranslateButton
                  className={styles.translateButton}
                  type={ALBUM}
                  id={albumId}
                  targetLocale={locale}
                />
              </Fragment>
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
    description: TranslatedTextType,
    id: PropTypes.string.isRequired,
    media: PropTypes.any,
    title: TranslatedTextType.isRequired,
  }).isRequired,
  renderIfEmpty: PropTypes.bool,
  renderSliderOnly: PropTypes.bool,
  showAttribution: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

AlbumPreview.defaultProps = {
  renderIfEmpty: false,
  renderSliderOnly: false,
  showAttribution: false,
};

export default Translate(messages)(AlbumPreview);
