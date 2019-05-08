import classnames from 'classnames';
import SVG from 'Components/SVG/index';
import Translate from 'Hocs/Translate';
import Done from 'Images/registration-done.svg';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import messages from '../messages';
import styles from './styles.scss';

const RegistrationSteps = (props) => {
  const { current, t } = props;

  const steps = [{ id: 1, label: 'step1Label' }, { id: 2, label: 'step2Label' }];

  return (
    <ol className={styles.steps}>
      {steps.map((step, i) => {
        const { id, label } = step;
        const isLast = i === steps.length - 1;
        const className = classnames(
          styles.step,
          { [styles.done]: id < current },
          { [styles.current]: id === current },
          { [styles.next]: id > current },
        );

        return (
          <Fragment key={id}>
            <li className={className}>
              <span className={styles.numberWrapper} aria-hidden="true">
                {id < current ? (
                  <SVG icon={Done} className={styles.doneIcon} />
                ) : (
                  <span className={styles.number}>{id}</span>
                )}
              </span>
              <span className={styles.label}>{t(label)}</span>
            </li>
            {!isLast && <li className={styles.lines} aria-hidden="true" />}
          </Fragment>
        );
      })}
    </ol>
  );
};

RegistrationSteps.propTypes = {
  current: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(RegistrationSteps);
