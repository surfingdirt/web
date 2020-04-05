import React from 'react';
import PropTypes from 'prop-types';

import { renderDate } from 'Utils/misc';

const Date = ({ className, date, locale }) => (
  <span className={className}>{renderDate(date, locale)}</span>
);

Date.propTypes = {
  className: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
};

export default Date;
