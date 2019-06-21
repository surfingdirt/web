import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router';

import Translate from 'Hocs/Translate';
import NavigationLink from 'Components/NavigationLink';
import icons from 'Utils/icons';
import { albumRoute } from 'Utils/links';
import contexts from '~/contexts';
import routes from '~/routes';

import styles from './styles.scss';
import messages from './messages';

const { ALBUMS, USERS } = routes;
const { AppContext } = contexts;

const Navigation = ({ className, t, url }, { galleryAlbumId }) => {
  const items = [
    { to: albumRoute(galleryAlbumId), icon: icons.HOT, label: t('gallery') },
    { to: ALBUMS, icon: icons.ALBUM, label: t('albums') },
    { to: USERS, icon: icons.USERS, label: t('riders') },
  ];
  return (
    <nav className={classnames(styles.wrapper, className)}>
      <ul className={styles.linkList}>
        {items.map((props) => (
          <li key={props.to}>
            <NavigationLink {...props} active={props.to === url} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  t: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

Navigation.contextType = AppContext;

export default Translate(messages)(withRouter(Navigation));