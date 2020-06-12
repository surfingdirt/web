import React from 'react';

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

export default Emoji;
