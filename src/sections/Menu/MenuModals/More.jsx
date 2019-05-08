import SVG from 'Components/SVG';
import Translate from 'Hocs/Translate';
import Close from 'Images/close.svg';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '~/routes';

import messages from '../messages';
import styles from '../styles.scss';

const { HOME, SIGN_IN } = routes;

const More = ({ handler, t }) => (
  <div className={styles.menuModal}>
    <div className={styles.header}>
      <div className={styles.content}>
        <button
          className={styles.closeModal}
          onClick={() => {
            handler();
          }}
          type="button"
        >
          <SVG icon={Close} />
        </button>
        <h2 className={styles.title}>{t('more')}</h2>
      </div>
    </div>
    <ul className={styles.menu}>
      <li>
        <Link
          onClick={() => {
            handler();
          }}
          className={`${styles.main} ${styles.blueLink}`}
          to={SIGN_IN}
        >
          {t('account')}
        </Link>
      </li>
      <li>
        <Link
          onClick={() => {
            handler();
          }}
          className={styles.main}
          to={HOME}
        >
          {t('settings')}
        </Link>
      </li>
      <li>
        <Link
          onClick={() => {
            handler();
          }}
          className={styles.main}
          to={HOME}
        >
          {t('socialWall')}
        </Link>
      </li>
      <li>
        <Link
          onClick={() => {
            handler();
          }}
          className={styles.main}
          to={HOME}
        >
          {t('fantasyLeague')}
        </Link>
      </li>
      <div className={styles.separator} />
      <li>
        <Link
          onClick={() => {
            handler();
          }}
          className={styles.main}
          to={HOME}
        >
          {t('about')}
        </Link>
      </li>
      <li>
        <Link
          onClick={() => {
            handler();
          }}
          className={styles.main}
          to={HOME}
        >
          {t('partners')}
        </Link>
      </li>
      <div className={styles.separator} />
      <li>
        <Link
          onClick={() => {
            handler();
          }}
          className={styles.main}
          to={HOME}
        >
          {t('faqs')}
        </Link>
      </li>
      <li>
        <Link
          onClick={() => {
            handler();
          }}
          className={styles.main}
          to={HOME}
        >
          {t('contactUs')}
        </Link>
      </li>
    </ul>
  </div>
);

More.propTypes = {
  handler: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(More);
