import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import Logo from 'Components/Logo';
import SVG from 'Components/SVG';
import BottomBar from 'Images/bottom-bar.svg';
import Search from 'Images/search-circle.svg';
import ThreeDots from 'Images/navigation-menu-horizontal.svg';
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
        <header className={styles.header}>
          <div className={styles.headerBackground} />
          <Link to={HOME} className={styles.logo}>
            <Logo title={title} />
          </Link>
          <div className={styles.search}>
            <SVG icon={Search} label="search" />
          </div>
          <div className={styles.activity}>Activity</div>
          <div className={styles.profile}>Profile</div>
        </header>

        <Navigation className={styles.navigation} url={url} />
        <Footer className={styles.footer} />
        <Actions className={styles.actions} />
        <Main className={styles.main}>{children}</Main>

        <nav className={styles.bottomBar}>
          <div className={styles.more}>
            <SVG icon={ThreeDots} hollow label="" className={styles.moreIcon}/>
          </div>
          <div className={styles.bottomBarBackground}>
            <SVG icon={BottomBar} hollow label="" />
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Layout);
