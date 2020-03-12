import React from 'react';
import PropTypes from 'prop-types';

import Button, { buttonTypes } from 'Components/Widgets/Button';
import Card, { cardTypes } from 'Components/Widgets/Card';
import routes from '~/routes';

import styles from './styles.scss';

const { ALBUMS } = routes;
const { ACTION } = buttonTypes;

const MoreAlbums = ({ buttonLabel, label, loading, onClick }) => {
  const attrs = onClick ? { onClick } : { href: ALBUMS };
  return (
    <Card type={cardTypes.STANDARD} className={styles.wrapper}>
      {label && <p className={styles.moreAlbums}>{label}</p>}
      <Button
        type={ACTION}
        label={buttonLabel}
        loading={loading}
        {...attrs}
        className={styles.button}
      />
    </Card>
  );
};

MoreAlbums.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  label: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

MoreAlbums.defaultProps = {
  label: null,
  loading: false,
  onClick: null,
};

export default MoreAlbums;
