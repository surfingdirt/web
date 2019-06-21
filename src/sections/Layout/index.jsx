import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import Logo from 'Components/Logo';
import Actions from 'Sections/Actions';
import Footer from 'Sections/Footer';
import Main from 'Sections/Main';
import Navigation from 'Sections/Navigation';
import contexts from '~/contexts';
import routes from '~/routes';

const { HOME } = routes;
const { AppContext } = contexts;

import styles from './styles.scss';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  static contextType = AppContext;
  render() {
    const {
      children,
      match: { url },
    } = this.props;
    const { title } = this.context;
    return (
      <div className={styles.wrapper}>
        <div className={styles.headerBackground} />

        <header className={styles.header}>
          <div className={styles.headerContents} />
          <Link to={HOME} className={classnames(styles.logoLink, styles.logo)}>
            <Logo title={title} />
          </Link>
          <div className={styles.search}>Search</div>
          <div className={styles.activity}>Activity</div>
          <div className={styles.profile}>Profile</div>
        </header>

        <div className={styles.more}>More</div>

        <Navigation className={styles.navigation} url={url} />
        <Footer className={styles.footer} />
        <Actions className={styles.actions} />
        <Main className={styles.main}>{children}</Main>
        <div className={styles.headerBackground} />
      </div>
    );
  }
}

export default withRouter(Layout);
