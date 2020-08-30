/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button, { buttonTypes } from 'Components/Widgets/Button';
import Card, { cardTypes } from 'Components/Widgets/Card';
import Translate from 'Hocs/Translate';
import FourDown2020 from 'Images/FourDown2020.png';
import routes from '~/routes';

import messages from './messages';
import styles from './styles.scss';

const { FOUR_DOWN } = routes;

const FourDownHomeSection = ({ t }) => {
  return (
    <Card type={cardTypes.BARE} className={styles.wrapper}>
      <div className={styles.content}>
        <Link to={FOUR_DOWN}>
          <img className={styles.splash} src={FourDown2020} alt="4 Down project" />
        </Link>
        <div className={styles.description}>
          <p>{t('fourDown')}</p>
          <p>{t('description')}</p>
          <Button href={FOUR_DOWN} type={buttonTypes.ACTION} label={t('vote')} />
        </div>
      </div>
    </Card>
  );
};

FourDownHomeSection.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(FourDownHomeSection);
