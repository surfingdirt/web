import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import styles from './styles.scss';

const TabPanel = ({ children, className, id, label }) => (
  <div
    aria-label={label}
    aria-hidden={false}
    id={id}
    role="tabpanel"
    tabIndex="0"
    className={classnames(styles.tabPanel, className)}
  >
    {children}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]).isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

TabPanel.defaultProps = {
  className: null,
};

export default TabPanel;
