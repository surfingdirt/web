import React from 'react';
import PropTypes from 'prop-types';

import Button, { buttonTypes } from 'Components/Widgets/Button';
import Card, { cardTypes } from 'Components/Widgets/Card';

import styles from './styles.scss';

const { ACTION } = buttonTypes;

const MoreFeedPages = ({ buttonLabel, label, loading, onClick }) => {
  return (
    <Card type={cardTypes.STANDARD} className={styles.wrapper}>
      {label && <p className={styles.moreLabel}>{label}</p>}
      <Button
        type={ACTION}
        label={buttonLabel}
        loading={loading}
        onClick={onClick}
        className={styles.button}
      />
    </Card>
  );
};

MoreFeedPages.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  label: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

MoreFeedPages.defaultProps = {
  label: null,
  loading: false,
  onClick: null,
};

export default MoreFeedPages;
