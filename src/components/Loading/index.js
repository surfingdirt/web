/* eslint-disable no-console */

import Spinner from 'Components/Spinner';

import Translate from 'Hocs/Translate';
import PropTypes from 'prop-types';
import React from 'react';
import messages from './messages';

import styles from './styles.scss';

class Loading extends React.Component {
  renderContent() {
    const { isLoading, timedOut, pastDelay, error, t } = this.props;

    if (error) {
      console.error('Loading - Error:', error);
      return <div className={styles.message}>{t('error')}</div>;
    }

    if (isLoading) {
      if (timedOut) {
        return <div className={styles.message}>{t('timeout')}</div>;
      }
      if (pastDelay) {
        return <Spinner negative />;
      }

      // We may still load the component before crossing the pastDelay limit: render nothing.
      return null;
    }
    return null;
  }

  render() {
    return <div className={styles.container}>{this.renderContent()}</div>;
  }
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
  timedOut: PropTypes.bool,
  pastDelay: PropTypes.bool,
  error: PropTypes.string,
  t: PropTypes.func.isRequired,
};

Loading.defaultProps = {
  isLoading: false,
  timedOut: false,
  pastDelay: false,
  error: '',
};

export default Translate(messages)(Loading);
