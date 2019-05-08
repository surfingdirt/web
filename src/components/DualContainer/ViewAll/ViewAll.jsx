import classnames from 'classnames';
import SVG from 'Components/SVG';

import Translate from 'Hocs/Translate';
import ArrowRight from 'Images/arrowRight.svg';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import messages from '../messages';

import styles from './styles.scss';

const ViewAll = ({ t, link }) => (
  <Link to={link} className={styles.link}>
    <div className={styles.container}>
      <div className={styles.title}>{t('viewAll')}</div>
      <SVG className={classnames('rtlTransform', styles.svg)} icon={ArrowRight} presentationOnly />
    </div>
  </Link>
);

ViewAll.propTypes = {
  t: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
};

export default Translate(messages)(ViewAll);
