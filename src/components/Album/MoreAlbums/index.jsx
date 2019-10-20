import React from 'react';
import PropTypes from 'prop-types';

import Button, { buttonTypes } from 'Components/Button';
import icons from 'Utils/icons';
import routes from '~/routes';

import styles from './styles.scss';

const { ALBUMS } = routes;
const { ACTION } = buttonTypes;

const MoreAlbums = ({ label, loading, onClick }) => {
  const attrs = onClick ? { onClick } : { href: ALBUMS };
  return (
    <Button type={ACTION} label={label} loading={loading} {...attrs} className={styles.button} />
  );
};

MoreAlbums.propTypes = {
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

MoreAlbums.defaultProps = {
  loading: false,
  onClick: null,
};

export default MoreAlbums;
