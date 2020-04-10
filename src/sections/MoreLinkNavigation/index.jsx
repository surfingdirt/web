import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withRouter } from 'react-router';

import Translate from 'Hocs/Translate';
import NavigationLink from 'Components/Widgets/NavigationLink';
import Actions from 'Sections/Actions';
import Footer from 'Sections/Footer';
import icons, { getIcon } from 'Utils/icons';
import sizes from 'Utils/iconSizes';
import { albumRoute } from 'Utils/links';
import AppContext from '~/contexts';
import routes from '~/routes';

import styles from './styles.scss';
import messages from './messages';

const { ALBUMS, USERS } = routes;
const { STANDARD } = sizes;

class MoreLinkNavigationRaw extends React.Component {
  static propTypes = {
    actionItems: PropTypes.arrayOf(
      PropTypes.shape({
        to: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }),
    ).isRequired,
    t: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    innerRef: PropTypes.shape({
      current: PropTypes.instanceOf(typeof Element === 'undefined' ? () => {} : Element),
    }).isRequired,
    onCloseClick: PropTypes.func.isRequired,
    openOnMobile: PropTypes.bool.isRequired,
    openClassName: PropTypes.string.isRequired,
    currentUrl: PropTypes.string.isRequired,
  };

  static contextType = AppContext;

  render() {
    const {
      actionItems,
      className,
      currentUrl,
      id,
      innerRef,
      onCloseClick,
      openClassName,
      openOnMobile,
      t,
    } = this.props;
    const { galleryAlbumId } = this.context;
    const items = [
      { to: albumRoute(galleryAlbumId), icon: icons.HOT, label: t('gallery') },
      { to: ALBUMS, icon: icons.ALBUM, label: t('albums') },
      { to: USERS, icon: icons.USERS, label: t('riders') },
    ];
    return (
      <nav
        className={classnames(styles.wrapper, className, { [openClassName]: openOnMobile })}
        aria-label={t('linkNav')}
      >
        <div className={styles.background}>
          <div className={styles.positioner} role="menu" id={id} ref={innerRef}>
            <div className={styles.topNavWrapper}>
              <ul className={styles.linkList}>
                {items.map((props) => (
                  <li key={props.to}>
                    <NavigationLink {...props} active={props.to === currentUrl} />
                  </li>
                ))}
              </ul>
              <Actions className={styles.actions} items={actionItems} label={t('actionNav')} />
            </div>

            <Footer className={styles.footer} />

            <button className={styles.closeBtn} type="button" onClick={onCloseClick}>
              {getIcon({ type: icons.CLOSE, size: STANDARD, label: t('close') })}
            </button>
          </div>
        </div>
      </nav>
    );
  }
}
const TranslatedMoreLinkNavigation = Translate(messages)(withRouter(MoreLinkNavigationRaw));
const MoreLinkNavigation = React.forwardRef((props, ref) => (
  <TranslatedMoreLinkNavigation innerRef={ref} {...props} />
));
MoreLinkNavigation.displayName = 'LinkNavigation';
export default MoreLinkNavigation;
