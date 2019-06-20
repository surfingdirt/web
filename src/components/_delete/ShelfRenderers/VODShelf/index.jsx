import React from 'react';
import PropTypes from 'prop-types';

import Grid from 'Components/Grid';
import ThumbVideo from 'Components/_delete/VideoRenderers/ThumbVideo/index';

const VODShelf = ({ items, colCount }) => {
  return <Grid renderer={ThumbVideo} type={`col${colCount}`} items={items.slice(0, colCount)} />;
};

VODShelf.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  colCount: PropTypes.number.isRequired,
};

export default VODShelf;
