import React, { Fragment } from 'react';

import KnownErrors from 'Error/knownErrors';

const ErrorMessage = ({ code, message }) => {
  return (
    <Fragment>
      <div>{KnownErrors[message] || 'unknownErrorName'}</div>
      <div>{code}</div>
    </Fragment>
  );
};

export default ErrorMessage;
