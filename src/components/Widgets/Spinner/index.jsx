import classnames from 'classnames';

import SVG from 'Components/Widgets/SVG';
import SpinnerSVG from 'Images/spinner.svg';
import React from 'react';

import styles from './styles.scss';

const Spinner = ({ className, negative = false, small = false }) => (
  <div className={classnames(styles.loadingContainer, { [styles.small]: small })}>
    <div className={classnames(styles.spinner, { [styles.negative]: negative }, className)}>
      <SVG icon={SpinnerSVG} />
    </div>
  </div>
);

export default Spinner;

export const InlineSpinner = ({ className, negative = true }) => (
  <div className={classnames(styles.inlineSpinner, { [styles.negative]: negative }, className)}>
    <SVG icon={SpinnerSVG} />
  </div>
);
