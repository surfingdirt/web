import React from 'react';
import PropTypes from 'prop-types';

import ToggleGroup from 'Components/Widgets/ToggleGroup';
import Translate from 'Hocs/Translate';
import icons, { getIcon } from 'Utils/icons';
import iconSizes from 'Utils/iconSizes';

import messages from './messages';

const { GRID, LIST } = icons;
const iconSize = iconSizes.SMALL;

export const ALBUM_VIEW_TYPE_VAR_NAME = 'viewType';
export const ALBUM_VIEW_GRID = 'grid';
export const ALBUM_VIEW_LIST = 'list';

const AlbumViewToggle = ({ onChange, t, viewType }) => {
  const toggleItems = [
    {
      icon: getIcon({ type: GRID, presentationOnly: true, size: iconSize }),
      label: t('gridView'),
      value: ALBUM_VIEW_GRID,
    },
    {
      icon: getIcon({ type: LIST, presentationOnly: true, size: iconSize }),
      label: t('listView'),
      value: ALBUM_VIEW_LIST,
    },
  ];

  return (
    <div>
      <ToggleGroup
        items={toggleItems}
        onChange={onChange}
        selected={viewType}
        name={ALBUM_VIEW_TYPE_VAR_NAME}
      />
    </div>
  );
};

AlbumViewToggle.propTypes = {
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  viewType: PropTypes.oneOf([ALBUM_VIEW_GRID, ALBUM_VIEW_LIST]).isRequired,
};

export default Translate(messages)(AlbumViewToggle);
