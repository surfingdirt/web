import React from 'react';
import PropTypes from 'prop-types';

import SVG from 'Components/SVG';

const Icon = ({ className, icon, hollow, label }) => (
  <SVG className={className} icon={icon} label={label} hollow={hollow} />
);

Icon.propTypes = {
  className: PropTypes.string,
  hollow: PropTypes.boolean,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Icon.defaultProps = {
  className: null,
  hollow: false,
  label: '',
};

export default Icon;
