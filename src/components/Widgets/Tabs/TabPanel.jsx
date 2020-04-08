import PropTypes from 'prop-types';
import React from 'react';

const TabPanel = ({ children, className, id, label }) => (
  <div
    aria-label={label}
    aria-hidden={false}
    id={id}
    role="tabpanel"
    tabIndex="0"
    className={className}
  >
    {children}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]).isRequired,
  className: PropTypes.string,
  defaultTab: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

TabPanel.defaultProps = {
  className: null,
  defaultTab: false,
};

export default TabPanel;
