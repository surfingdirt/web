import SVG from 'Components/SVG';
import Translate from 'Hocs/Translate';
import Facebook from 'Images/facebook2.svg';
import Instagram from 'Images/instagram.svg';
import Twitter from 'Images/twitter.svg';
import Logo from 'Images/logo.png';
import ScrollTop from 'Images/scrollTop.svg';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import routes from '~/routes';
import messages from './messages';

import styles from './styles.scss';

const { COOKIE_POLICY, HOME, PRIVACY_POLICY, SITEMAP, SUPPORT, TERMS_CONDITIONS } = routes;

class FooterContent extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;
    return (
      <div className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.left}>
              <Link className={styles.footerlogo} to={HOME}>
                <img src={Logo} alt={t('logoAlt')} />
              </Link>
              <div className={styles.separator} />
              <div className={styles.list}>
                <ul>
                  <li>
                    <Link to={HOME}>{t('welcome')}</Link>
                  </li>
                  <li>
                    <Link to={SUPPORT}>{t('support')}</Link>
                  </li>
                  <li>
                    <Link to={TERMS_CONDITIONS}>{t('termsOfService')}</Link>
                  </li>
                  <li>
                    <Link to={PRIVACY_POLICY}>{t('privacyPolicy')}</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.follow}>
                <div className={styles.text}>{t('followUs')}</div>
                <div className={styles.links}>
                  <div>
                    <a
                      href="https://www.facebook.com/IsraelProFootball"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <SVG icon={Facebook} hollow />
                    </a>
                  </div>
                  <div>
                    <a
                      href="twitter"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <SVG icon={Twitter} hollow />
                    </a>
                  </div>
                  <div>
                    <a
                      href="instagram"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <SVG icon={Instagram} hollow />
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.apps}>
                <a href="/" rel="noopener noreferrer" target="_blank">
                  <img
                    alt={t('appleDownload')}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png"
                  />
                </a>
                <a href="/" rel="noopener noreferrer" target="_blank">
                  <img
                    alt={t('googleDownload')}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Get_it_on_Google_play.svg/1280px-Get_it_on_Google_play.svg.png"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.links}>
            <p>
              <Link to={SITEMAP}>{t('sitemap')}</Link>
            </p>
            <p>
              <Link to={PRIVACY_POLICY}>{t('privacy')}</Link>
            </p>
            <p>
              <Link to={TERMS_CONDITIONS}>{t('termsConditions')}</Link>
            </p>
            <p>
              <Link to={COOKIE_POLICY}>{t('cookiePolicy')}</Link>
            </p>
          </div>
          <div className={styles.scrollTop}>
            {/* eslint-disable-next-line */}
            <a href="#">
              <span>{t('scrollTop')}</span>
              <SVG icon={ScrollTop} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Translate(messages)(FooterContent);
