import SVG from 'Components/SVG';
import Translate from 'Hocs/Translate';
import Close from 'Images/close.svg';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '~/routes';

import messages from '../messages';
import styles from '../styles.scss';

const { CLUBS, PLAYERS, STANDINGS, FIXTURES } = routes;

const Competitions = ({ handler, t }) => (
  <div className={`${styles.menuModal} ${styles.competitions}`}>
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
        <h2 className={styles.title}>{t('competitions')}</h2>
      </div>
    </div>
    <ul className={styles.menu}>
      <li>
        <Link
          onClick={() => {
            handler();
          }}
          className={styles.main}
          to={FIXTURES}
        >
          {t('fixtures')}
        </Link>
      </li>
      <li>
        <Link
          onClick={() => {
            handler();
          }}
          className={styles.main}
          to={STANDINGS}
        >
          {t('standings')}
        </Link>
      </li>
      <div className={styles.separator} />
      <li>
        <Link
          onClick={() => {
            handler();
          }}
          className={styles.main}
          to={CLUBS}
        >
          {t('clubs')}
        </Link>
      </li>
      <li>
        <Link
          onClick={() => {
            handler();
          }}
          className={styles.main}
          to={PLAYERS}
        >
          {t('players')}
        </Link>
      </li>
      <div className={styles.separator} />
    </ul>
  </div>
);

Competitions.propTypes = {
  handler: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Competitions);
