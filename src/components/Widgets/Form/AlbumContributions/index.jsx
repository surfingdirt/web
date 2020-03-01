import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const PUBLIC = 'PUBLIC';
const PRIVATE = 'PRIVATE';

const AlbumContributions = ({ className, onChange, t, ...inputAttrs }) => {
  const newAttrs = { ...inputAttrs };
  delete newAttrs.value;

  return (
    <select
      defaultValue={PUBLIC}
      className={classnames(styles.select, className)}
      onChange={onChange}
      {...newAttrs}
    >
      <option key="public" value={PUBLIC}>
        {t('public')}
      </option>
      <option key="private" value={PRIVATE}>
        {t('private')}
      </option>
    </select>
  );
};

AlbumContributions.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
};

AlbumContributions.defaultProps = {
  className: null,
  onChange: null,
};

export default Translate(messages)(AlbumContributions);
