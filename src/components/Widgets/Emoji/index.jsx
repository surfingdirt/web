import React from 'react';
import PropTypes from 'prop-types';

const Emoji = ({ className, codepoint, label }) => {
  const attrs = {};
  if (label) {
    attrs['aria-label'] = label;
  }
  return (
    <svg className={className} {...attrs}>
      <use xlinkHref={`#emoji-${codepoint}`} />
    </svg>
  );
};

Emoji.propTypes = {
  className: PropTypes.string,
  codepoint: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Emoji.defaultProps = { className: null, label: null };

export default Emoji;
