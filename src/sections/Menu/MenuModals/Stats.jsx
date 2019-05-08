import SVG from 'Components/SVG';
import Translate from 'Hocs/Translate';
import Close from 'Images/close.svg';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import routes from '~/routes';

import messages from '../messages';
import styles from '../styles.scss';

const { CLUB_STATS, PLAYER_STATS } = routes;

const Stats = ({ handler, t }) => (
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
        <span className={styles.main}>{t('seasonStats')}</span>
        <ul>
          <li>
            <Link
              onClick={() => {
                handler();
              }}
              className={styles.sub}
              to={PLAYER_STATS}
            >
              {t('playerStats')}
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                handler();
              }}
              className={styles.sub}
              to={CLUB_STATS}
            >
              {t('clubStats')}
            </Link>
          </li>
        </ul>
      </li>
      <li>
        <Link
          onClick={() => {
            handler();
          }}
          className={styles.main}
          to={PLAYER_STATS}
        >
          {t('playerComparison')}
        </Link>
      </li>
      <li>
        <Link
          onClick={() => {
            handler();
          }}
          className={styles.main}
          to={CLUB_STATS}
        >
          {t('clubComparison')}
        </Link>
      </li>
    </ul>
  </div>
);

Stats.propTypes = {
  handler: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Stats);
