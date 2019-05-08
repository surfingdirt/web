import SVG from 'Components/SVG';
import Translate from 'Hocs/Translate';
import Close from 'Images/close.svg';
import PropTypes from 'prop-types';
import React from 'react';

import messages from '../messages';
import styles from '../styles.scss';

const Videos = ({ handler, t }) => (
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
        <h2 className={styles.title}>{t('videos')}</h2>
      </div>
    </div>
  </div>
);

Videos.propTypes = {
  handler: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(Videos);
