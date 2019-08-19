import classnames from 'classnames';

import SVG from 'Components/SVG';
import SpinnerSVG from 'Images/_old/spinner.svg';
import React from 'react';

import styles from './styles.scss';

const Spinner = ({ className }) => (
  <div className="loadingContainer">
    <div className={classnames(styles.inlineSpinner, className)}>
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
