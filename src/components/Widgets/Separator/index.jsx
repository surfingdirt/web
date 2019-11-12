import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Separator = ({ className }) => <hr className={classnames(styles.main, className)} />;

Separator.propTypes = {
  className: PropTypes.string,
};

Separator.defaultProps = {
  className: null,
};

export default Separator;
