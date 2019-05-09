import Translate from 'Hocs/Translate';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import messages from './messages';

import styles from './styles.scss';

class FooterContent extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;
    return (
      <div className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.content}>
            Footer
          </div>
        </div>
      </div>
    );
  }
}

export default Translate(messages)(FooterContent);
