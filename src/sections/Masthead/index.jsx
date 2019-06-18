import React  from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Logo from 'Sections/Logo';
import routes from '~/routes';

import styles from './styles.scss';

const { HOME } = routes;

class Masthead extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render() {
    const { title } = this.props;
    return (
      <header className={styles.wrapper}>
        <Link to={HOME} className={styles.logoLink}>
          <Logo title={title} />
        </Link>
      </header>
    );
  }
}

export default Masthead;
