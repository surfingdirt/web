import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const PageContainer = (props) => {
  const { children, className } = props;
  return <div className={classnames('pageContainer', className)}>{children}</div>;
};

PageContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
PageContainer.defaultProps = { className: '' };

export default PageContainer;
