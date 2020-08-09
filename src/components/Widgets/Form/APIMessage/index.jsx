import React from 'react';
import PropTypes from 'prop-types';

import Translate from 'Hocs/Translate';

import messages from './messages';

const FormAPIMessage = ({ className, t, message }) => {
  console.log('rendering error', message, t(message));
  return <span className={className}>{t(message) || message}</span>;
};

FormAPIMessage.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

FormAPIMessage.defaultProps = {
  className: null,
};

export default Translate(messages)(FormAPIMessage);
