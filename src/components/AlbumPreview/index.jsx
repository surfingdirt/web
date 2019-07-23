import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { albumRoute } from 'Utils/links';

const AlbumPreview = ({ album: { id, items, title } }) => {
  return (
    <Link to={albumRoute(id)}>
      {title} - {id} - ({items ? items.length : 0} items)
    </Link>
  );
};

AlbumPreview.propTypes = {
  album: PropTypes.objectOf({
    id: PropTypes.string.isRequired,
    items: PropTypes.arrayOf().isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default AlbumPreview;
