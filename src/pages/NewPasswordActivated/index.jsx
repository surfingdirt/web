import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Card, { cardTypes } from 'Components/Widgets/Card';
import Paragraph from 'Components/Widgets/Paragraph';
import Translate from 'Hocs/Translate';
import routes from '~/routes';

import messages from './messages';

const { LOGIN } = routes;
const { STANDARD } = cardTypes;

const NewPasswordActivated = ({ t }) => (
  <Card title={t('passwordActivation')} type={STANDARD}>
    <Paragraph>{t('done')}</Paragraph>
    <Paragraph>{t('useNewPassword')}</Paragraph>
    <Paragraph>
      <Link to={LOGIN}>{t('signIn')}</Link>
    </Paragraph>
  </Card>
);

NewPasswordActivated.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(NewPasswordActivated);
