import Translate from 'Hocs/Translate';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import messages from './messages';

import styles from './styles.scss';

const Actions = ({ className }) => (
  <aside className={classnames(styles.wrapper, className)}>Actions</aside>
);

Actions.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Translate(messages)(Actions);
