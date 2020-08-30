import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

import Card, { cardTypes } from 'Components/Widgets/Card';
import Translate from 'Hocs/Translate';
import AppContext from '~/contexts';
import routes from '~/routes';

import EmailPassword from '../EmailPassword';
import FirebaseAuth from '../FirebaseAuth';
import messages from './messages';

const { STANDARD } = cardTypes;
const { HOME } = routes;

const FourDownLogin = ({ t }) => {
  const {
    features: { firebaseAuth },
    login: {
      data: {
        me: { username },
      },
    },
  } = useContext(AppContext);

  if (username) {
    return <Redirect to={HOME} />;
  }

  let content;
  if (firebaseAuth) {
    content = (
      <>
        <p>{t('explanationsOAuth')}</p>
        <FirebaseAuth />
        <p>{t('explanationsEmailPassword')}</p>
        <EmailPassword />
      </>
    );
  } else {
    content = <EmailPassword />;
  }

  return (
    <Card title={t('signIn')} type={STANDARD}>
      {content}
    </Card>
  );
};

FourDownLogin.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(FourDownLogin);
