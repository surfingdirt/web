import React from 'react';
import PropTypes from 'prop-types';

import Card, { cardTypes } from 'Components/Widgets/Card';
import errorCodes from 'Error/errorCodes';
import Translate from 'Hocs/Translate';

import translations from './messages';

const { STANDARD } = cardTypes;
const DEFAULT_MESSAGE = 'unknownErrorName';

const ErrorMessage = ({ t, code, message }) => {
  const messageName = message || errorCodes[code] || DEFAULT_MESSAGE;

  return (
    <Card type={STANDARD} title={t(messageName)}>
      <p>{code}</p>
    </Card>
  );
};

ErrorMessage.propTypes = {
  t: PropTypes.func.isRequired,
  code: PropTypes.string,
  message: PropTypes.string,
};

ErrorMessage.defaultProps = {
  message: '',
  code: '',
};

export default Translate(translations)(ErrorMessage);
