import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.scss';
import ErrorMessage from 'Components/ErrorMessage';

export const Error = ({ match }) => {
  const { id, message } = match.params;

  return (
    <div className={styles.page}>
      <ErrorMessage code={id} message={message} />
    </div>
  );
};

Error.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};
