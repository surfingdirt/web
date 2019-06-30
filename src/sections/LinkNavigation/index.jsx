import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router';

import Translate from 'Hocs/Translate';
import NavigationLink from 'Components/NavigationLink';
import Footer from 'Sections/Footer';
import icons, { getIcon, sizes } from 'Utils/icons';
import { albumRoute } from 'Utils/links';
import AppContext from '~/contexts';
import routes from '~/routes';

import styles from './styles.scss';
import messages from './messages';

const { ALBUMS, USERS } = routes;
const { STANDARD } = sizes;

class LinkNavigationRaw extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    innerRef: PropTypes.shape({
      current: PropTypes.instanceOf(typeof Element === 'undefined' ? () => {} : Element),
    }).isRequired,
    onCloseClick: PropTypes.func.isRequired,
    openOnMobile: PropTypes.bool.isRequired,
    currentUrl: PropTypes.string.isRequired,
  };

  static contextType = AppContext;

  render() {
    const { className, currentUrl, id, innerRef, onCloseClick, openOnMobile, t } = this.props;
    const { galleryAlbumId } = this.context;
    const items = [
      { to: albumRoute(galleryAlbumId), icon: icons.HOT, label: t('gallery') },
      { to: ALBUMS, icon: icons.ALBUM, label: t('albums') },
      { to: USERS, icon: icons.USERS, label: t('riders') },
    ];
    return (
      <nav
        className={classnames(styles.wrapper, className, { [styles.openOnMobile]: openOnMobile })}
        aria-label={t('linkNav')}
      >
        <div className={styles.positioner} role="menu" id={id} ref={innerRef}>
          <ul className={styles.linkList}>
            {items.map((props) => (
              <li key={props.to}>
                <NavigationLink {...props} active={props.to === currentUrl} />
              </li>
            ))}
          </ul>
          <button className={styles.closeBtn} type="button" onClick={onCloseClick}>
            {getIcon({ type: icons.CLOSE, size: STANDARD, label: t('close') })}
          </button>
          <Footer className={styles.footer} />
        </div>
      </nav>
    );
  }
}
const TranslatedLinkNavigation = Translate(messages)(withRouter(LinkNavigationRaw));
const LinkNavigation = React.forwardRef((props, ref) => (
  <TranslatedLinkNavigation innerRef={ref} {...props} />
));
LinkNavigation.displayName = 'LinkNavigation';
export default LinkNavigation;
