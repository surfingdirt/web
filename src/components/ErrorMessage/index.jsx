import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import errorCodes from 'Error/errorCodes';
import Translate from 'Hocs/Translate';

import translations from './messages';

const DEFAULT_MESSAGE = 'unknownErrorName';

const ErrorMessage = ({ t, code, message }) => {
  const messageName = message || errorCodes[code] || DEFAULT_MESSAGE;

  return (
    <Fragment>
      <div>{t(messageName)}</div>
      <div>{code}</div>
    </Fragment>
  );
};

ErrorMessage.propTypes = {
  t: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  message: PropTypes.string,
};

ErrorMessage.defaultProps = {
  message: '',
};

export default Translate(translations)(ErrorMessage);
