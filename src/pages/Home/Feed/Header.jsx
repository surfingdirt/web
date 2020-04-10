import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import classnames from 'classnames';

import Translate from 'Hocs/Translate';

import messages from '../messages';
import styles from './styles.scss';

const FeedHeader = (props) => {
  return <p>This will be the feed header</p>;
};

FeedHeader.propTypes = {};

FeedHeader.defaultProps = {};

export default Translate(messages)(FeedHeader);
