import React from 'react';

const Emoji = ({ className, codepoint, label }) => (
  <svg className={className} aria-label={label}>
    <use xlinkHref={`#emoji-${codepoint}`} />
  </svg>
);

export default Emoji;
