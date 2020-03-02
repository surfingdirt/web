import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Translate from 'Hocs/Translate';

import messages from './messages';
import styles from './styles.scss';

const VISIBLE = 'VISIBLE';
const UNLISTED = 'UNLISTED';
const PRIVATE = 'PRIVATE';

const AlbumVisibility = ({ className, onChange, t, ...inputAttrs }) => {
  return (
    <select
      defaultValue={VISIBLE}
      className={classnames(styles.select, className)}
      onChange={onChange}
      {...inputAttrs}
    >
      <option key="visible" value={VISIBLE}>
        {t('visible')}
      </option>
      <option key="unlisted" value={UNLISTED}>
        {t('unlisted')}
      </option>
      <option key="private" value={PRIVATE}>
        {t('hidden')}
      </option>
    </select>
  );
};

AlbumVisibility.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  t: PropTypes.func.isRequired,
};

AlbumVisibility.defaultProps = {
  className: null,
  onChange: null,
};

export default Translate(messages)(AlbumVisibility);
