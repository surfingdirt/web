import React, { Fragment } from 'react';
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
import { NAVIGATION_MORE_MENU } from '~/ids';

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
    checkboxClassName: PropTypes.string.isRequired,
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
      checkboxClassName,
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
      <Fragment>
        <input type="checkbox" id={NAVIGATION_MORE_MENU} className={checkboxClassName} hidden />
        <nav
          className={classnames(styles.wrapper, className, { [openClassName]: openOnMobile })}
          aria-label={t('linkNav')}
        >
          <div className={styles.background}>
            <div className={styles.positioner} role="menu" id={id} ref={innerRef}>
              <div className={styles.topNavWrapper} role="none">
                <ul className={styles.linkList} role="none">
                  {items.map((props) => (
                    <li key={props.to} role="none">
                      <NavigationLink {...props} active={props.to === currentUrl} role="menuitem" />
                    </li>
                  ))}
                </ul>
                <Actions className={styles.actions} items={actionItems} label={t('actionNav')} />
              </div>

              <Footer className={styles.footer} />

              {/* eslint-disable-next-line jsx-a11y/label-has-for */}
              <label
                className={styles.closeBtn}
                role="button"
                onClick={onCloseClick}
                htmlFor={NAVIGATION_MORE_MENU}
              >
                {getIcon({ type: icons.CLOSE, size: STANDARD, label: t('close') })}
              </label>
            </div>
          </div>
        </nav>
      </Fragment>
    );
  }
}
const TranslatedMoreLinkNavigation = Translate(messages)(withRouter(MoreLinkNavigationRaw));
const MoreLinkNavigation = React.forwardRef((props, ref) => (
  <TranslatedMoreLinkNavigation innerRef={ref} {...props} />
));
MoreLinkNavigation.displayName = 'LinkNavigation';
export default MoreLinkNavigation;
