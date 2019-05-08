import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Translate from 'Hocs/Translate';
import Logo from 'Images/logo.png';
import { getIdFromCategoryName, getCategoryNameFromId } from 'Utils/shelfUtils';
import routes from '~/routes';

import styles from './styles.scss';
import messages from './messages';

const { HOME } = routes;
const HASHCHANGE = 'hashchange';

class NavigationContent extends React.Component {
  constructor(props) {
    super(props);
    this.getSelectedNavEntry = this.getSelectedNavEntry.bind(this);
    this.updateSelectedNavEntry = this.updateSelectedNavEntry.bind(this);

    this.state = {
      selectedNavEntry: null,
    };
  }

  componentDidMount() {
    global.window.addEventListener(HASHCHANGE, this.updateSelectedNavEntry);
    this.updateSelectedNavEntry();
  }

  componentWillUnmount() {
    global.window.removeEventListener(HASHCHANGE, this.updateSelectedNavEntry);
  }

  getSelectedNavEntry() {
    const hash = global.window.location.hash.replace(/#/, '');
    return getCategoryNameFromId(hash);
  }

  updateSelectedNavEntry() {
    const selectedNavEntry = this.getSelectedNavEntry();
    this.setState({ selectedNavEntry });
  }

  render() {
    const { t, items } = this.props;
    const { selectedNavEntry } = this.state;
    return (
      <Fragment>
        <Link to={HOME} className={styles.logoLink}>
          <img className={styles.logoImage} src={Logo} alt={t('logoAlt')} />
        </Link>
        <ul className={styles.navEntries}>
          {items.map(({ label, category }) => (
            <li
              key={`${category}-key`}
              className={category === selectedNavEntry ? styles.selectedNavEntry : null}
            >
              <a href={`/#${getIdFromCategoryName(category)}`}>{label}</a>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

NavigationContent.propTypes = {
  t: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Translate(messages)(NavigationContent);
