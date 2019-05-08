import classnames from 'classnames';

import SVG from 'Components/SVG';
import SpinnerSVG from 'Images/spinner.svg';
import React from 'react';

import styles from './styles.scss';

const Spinner = () => (
  <div className="loadingContainer">
    <div className={styles.spinner}>
      <SVG icon={SpinnerSVG} />
    </div>
  </div>
);

export default Spinner;

export const InlineSpinner = ({ className }) => (
  <div className={classnames(styles.inlineSpinner, className)}>
    <SVG icon={SpinnerSVG} />
  </div>
);
