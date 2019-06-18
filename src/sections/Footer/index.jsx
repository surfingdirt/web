import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const Footer = ({ className }) => {
  return <footer className={classnames(styles.wrapper, className)}>About/Contact</footer>;
};

Footer.propTypes = {
  className: PropTypes.string.isRequired,
};

export default Translate(messages)(Footer);
