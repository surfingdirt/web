import React from 'react';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const EmptyRaw = ({ t }) => <div className={styles.wrapper}>{t('empty')}</div>;

EmptyRaw.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(EmptyRaw);
