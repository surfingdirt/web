import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import Translate from 'Hocs/Translate';
import routes from '~/routes';

import messages from './messages';
import styles from './styles.scss';

const { ABOUT, CONTACT } = routes;

const Footer = ({ className, t }) => {
  return (
    <footer className={classnames(styles.wrapper, className)}>
      <ul>
        <li>
          <Link to={ABOUT}>{t('about')}</Link>
        </li>
        <li>
          <Link to={CONTACT}>{t('contact')}</Link>
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
