import React from 'react';
import PropTypes from 'prop-types';

import NavigationLink from 'Components/NavigationLink';
import { InlineSpinner } from 'Components/Spinner';
import Translate from 'Hocs/Translate';
import icons from 'Utils/icons';
import routes from '~/routes';

import messages from './messages';
import styles from './styles.scss';

const { ALBUM } = icons;
const { ALBUMS } = routes;

const MoreAlbums = ({ loading, onClick, t }) => {
  if (loading) {
    return <InlineSpinner negative={false} className={styles.spinner}/>;
  }

  const attrs = onClick ? { onClick } : { to: ALBUMS };
  return <NavigationLink label={t('moreAlbums')} icon={ALBUM} negative {...attrs} />;
};

MoreAlbums.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  t: PropTypes.func.isRequired,
};

MoreAlbums.defaultProps = {
  loading: false,
  onClick: null,
};

export default Translate(messages)(MoreAlbums);
