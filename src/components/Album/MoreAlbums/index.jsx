import React from 'react';
import PropTypes from 'prop-types';

import Button, { buttonTypes } from 'Components/Widgets/Button';
import routes from '~/routes';

import styles from './styles.scss';

const { ALBUMS } = routes;
const { ACTION } = buttonTypes;

const MoreAlbums = ({ buttonLabel, label, loading, onClick }) => {
  const attrs = onClick ? { onClick } : { href: ALBUMS };
  return (
    <>
      <p className={styles.moreAlbums}>{label}</p>
      <Button
        type={ACTION}
        label={buttonLabel}
        loading={loading}
        {...attrs}
        className={styles.button}
      />
    </>
  );
};

MoreAlbums.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

MoreAlbums.defaultProps = {
  loading: false,
  onClick: null,
};

export default MoreAlbums;
