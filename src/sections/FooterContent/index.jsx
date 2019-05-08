import SVG from 'Components/SVG';
import Translate from 'Hocs/Translate';
import Facebook from 'Images/facebook2.svg';
import Instagram from 'Images/instagram.svg';
import Twitter from 'Images/twitter.svg';
import Logo from 'Images/logo.png';
import ScrollTop from 'Images/scrollTop.svg';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import routes from '~/routes';
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
