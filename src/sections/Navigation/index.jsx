import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import Translate from 'Hocs/Translate';
import { albumRoute } from 'Utils/links';
import contexts from '~/contexts';
import routes from '~/routes';

import styles from './styles.scss';
import messages from './messages';

const { ALBUMS, USERS } = routes;
const { AppContext } = contexts;

const Navigation = ({ className, t }, { galleryAlbumId }) => (
  <nav className={classnames(styles.wrapper, className)}>
    <ul className={styles.linkList}>
      <li>
        <Link to={albumRoute(galleryAlbumId)}>{t('gallery')}</Link>
      </li>
      <li>
        <Link to={ALBUMS}>{t('albums')}</Link>
      </li>
      <li>
        <Link to={USERS}>{t('riders')}</Link>
      </li>
    </ul>
  </nav>
);

Navigation.propTypes = {
  t: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

Navigation.contextType = AppContext;

export default Translate(messages)(Navigation);
