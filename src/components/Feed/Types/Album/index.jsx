import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AlbumPreview from 'Components/Album/AlbumPreview';
import Translate from 'Hocs/Translate';
import icons, { getIcon } from 'Utils/icons';
import iconSizes from 'Utils/iconSizes';
import { albumRoute } from 'Utils/links';

import messages from '../../messages';
import Date from '../../Date';
import styles from '../../styles.scss';

const { ALBUM } = icons;
const iconSize = iconSizes.SMALL;

const RawHeader = ({ id, t, title }) => (
  <Fragment>
    <span className={styles.headerText}>{t('newAlbum')}:&nbsp;</span>
    <Link to={albumRoute(id)} title={title}>
      {title}
    </Link>
  </Fragment>
);

RawHeader.propTypes = {
  title: PropTypes.shape({ text: PropTypes.string.isRequired }).isRequired,
  id: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

const Header = Translate(messages)(RawHeader);

export const getAlbumFeedEntryParts = (date, album, locale) => {
  const {
    id,
    title: { text: title },
  } = album;

  return {
    content: <AlbumPreview album={album} renderSliderOnly />,
    header: <Header id={id} title={title} />,
    icon: getIcon({ type: ALBUM, presentationOnly: true, size: iconSize }),
    footer: <Date className={styles.date} date={date} locale={locale} />,
  };
};
