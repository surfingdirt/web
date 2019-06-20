import Button from 'Components/Button';
import Translate from 'Hocs/Translate';
import Logo from 'Images/_old/logo.png';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import contexts from '~/contexts';
import routes from '~/routes';

import messages from './messages';
import styles from './styles.scss';

const { AppContext } = contexts;
const { REGISTRATION_STEP1, SIGN_IN } = routes;

class LoggedOutModal extends Component {
  static contextType = AppContext;

  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const {
      props: { t },
      context: {
        login: { saveOrigin },
      },
    } = this;

    return (
      <div className={styles.userNotLogged} aria-label={t('userNotLogged')}>
        <div className={styles.signIn}>
          <img src={Logo} alt="" />
          <p className={styles.text}>{t('loginRequired')}</p>
          <Button label={t('signIn')} href={SIGN_IN} onClick={saveOrigin} />
        </div>
        <div className={styles.register}>
          <h2>{t('noAccount')}</h2>
          <p>{t('noAccountSubtitle')}</p>
          <div className={styles.missing}>
            <p>{t('noAccountFeature1')}</p>
            <p>{t('noAccountFeature2')}</p>
            <p>{t('noAccountFeature3')}</p>
            <p>{t('noAccountFeature4')}</p>
          </div>
          <Button label={t('register')} href={REGISTRATION_STEP1} onClick={saveOrigin} />
        </div>
      </div>
    );
  }
}

export default Translate(messages)(LoggedOutModal);
