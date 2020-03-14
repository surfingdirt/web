import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Translate from 'Hocs/Translate/index';
import { userRoute } from 'Utils/links';

import messages from './messages';
import styles from './styles.scss';

const UsernameRaw = (props) => {
  const {
    className,
    hidden,
    user: { username, userId },
  } = props;

  return (
    <Link
      to={userRoute(userId)}
      className={classnames(styles.wrapper, className)}
      title={username}
      aria-hidden={hidden}
    >
      {username}
    </Link>
  );
};

UsernameRaw.propTypes = {
  className: PropTypes.string,
  hidden: PropTypes.bool,
  user: PropTypes.shape({
    username: PropTypes.string,
    userId: PropTypes.string,
  }).isRequired,
};

UsernameRaw.defaultProps = {
  className: null,
  hidden: false,
};

export default Translate(messages)(UsernameRaw);
