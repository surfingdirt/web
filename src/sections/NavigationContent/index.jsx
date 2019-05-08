import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Translate from 'Hocs/Translate';
import Logo from 'Images/logo.png';
import routes from '~/routes';

import styles from './styles.scss';
import messages from './messages';

const { HOME } = routes;

class NavigationContent extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <Link to={HOME} className={styles.logoLink}>
          <img className={styles.logoImage} src={Logo} alt={t('logoAlt')} />
        </Link>
      </Fragment>
    );
  }
}

NavigationContent.propTypes = {
  t: PropTypes.func.isRequired,
};

export default Translate(messages)(NavigationContent);
