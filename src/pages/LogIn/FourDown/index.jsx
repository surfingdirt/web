import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';

import Card, { cardTypes } from 'Components/Widgets/Card';
import ErrorMessage from 'Components/Widgets/ErrorMessage';
import Spinner from 'Components/Widgets/Spinner';
import Translate from 'Hocs/Translate';
import useFourDownAlbum from 'Pages/FourDown/useFourDownAlbum';
import { fourDownVideoRoute } from 'Utils/links';
import AppContext from '~/contexts';
import routes from '~/routes';

import SignInRegister from '../SignInRegister';
import FirebaseAuth from '../FirebaseAuth';
import messages from './messages';

const { STANDARD } = cardTypes;
const { HOME } = routes;

const FourDownLogin = ({ match, t }) => {
  const {
    login: {
      saveOrigin,
      data: {
        me: { username },
      },
    },
  } = useContext(AppContext);

  if (username) {
    return <Redirect to={HOME} />;
  }

  const { videos, loading, error } = useFourDownAlbum();

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage />;

  const { id } = match.params;
  const destination = fourDownVideoRoute(id);
  saveOrigin(destination);
  const item = videos.find((video) => video.id === id);

  return (
    <Card title={`${t('votingFor')} ${item.title.text}`} type={STANDARD}>
      <p>{t('explanations1')}</p>
      <p>{t('explanations2')}</p>
      <FirebaseAuth />
      <SignInRegister />
      <p>
        {t('googleForm')}{' '}
        <a href={item.formUrl} target="_blank" rel="noopener noreferrer">
          Google Form
        </a>
      </p>
    </Card>
  );
};

FourDownLogin.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(FourDownLogin);
