import React from 'react';
import PropTypes from 'prop-types';

import Card, { cardTypes } from 'Components/Widgets/Card';

import styles from './styles.scss';

const { BARE } = cardTypes;

const FeedEntryWrapper = ({ content, footer, header, icon }) => (
  <Card type={BARE} className={styles.wrapper}>
    <div className={styles.icon}>{icon}</div>
    <div className={styles.content}>
      <header className={styles.header}>{header}</header>
      <div className={styles.main}>{content}</div>
      <footer className={styles.footer}>{footer}</footer>
    </div>
  </Card>
);

FeedEntryWrapper.propTypes = {
  content: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired,
  header: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
};

export default FeedEntryWrapper;
