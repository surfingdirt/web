import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import Translate from 'Hocs/Translate';
import routes from '~/routes';

import messages from './messages';
import styles from './styles.scss';

const { ABOUT, OLD_FORUM } = routes;

const Footer = ({ className, t }) => {
  return (
    <footer className={classnames(styles.wrapper, className)}>
      <ul>
        <li className={styles.link}>
          <Link to={ABOUT}>{t('about')}</Link>
        </li>
        <li className={styles.link}>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSd-T8XLnoGn1ujbXK4bZg7cCL1v-2JlhCrkPyAZfUXRpVj-aw/viewform">
            {t('contact')}
          </a>
        </li>
        <li className={styles.link}>
          <Link to={OLD_FORUM}>{t('forum')}</Link>
        </li>
      </ul>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Footer);
