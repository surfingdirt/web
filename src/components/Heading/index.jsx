import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.scss';

const PRIMARY = 'primary';
const SECONDARY = 'secondary';
const MODAL = 'modal';
export const headingTypes = { PRIMARY, SECONDARY, MODAL };

const typeMapping = {
  [PRIMARY]: ['h1', 'primary'],
  [SECONDARY]: ['h2', 'secondary'],
  [MODAL]: ['h1', 'modal'],
};

export default class Heading extends React.PureComponent {
  static propTypes = {
    type: (props, propName, componentName) => {
      const type = props[propName];
      if (!type) {
        return new Error(`Empty type set for component '${componentName}'`);
      }

      if (!Object.values(headingTypes).includes(type)) {
        return new Error(`Invalid type set for component '${componentName}': '${type}'`);
      }

      return undefined;
    },
    className: PropTypes.string,
    link: PropTypes.string,
    tag: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    className: null,
    link: null,
    tag: null,
  };

  render() {
    const { className, children, link, tag, type } = this.props;
    const [defaultTag, defaultClassName] = typeMapping[type];

    const Tag = tag || defaultTag;

    const actualClassName = classnames(styles[defaultClassName], className);
    if (link) {
      return (
        <Link to={link} className={styles.titleLink}>
          <Tag className={actualClassName}>{children}</Tag>
        </Link>
      );
    }
    return <Tag className={actualClassName}>{children}</Tag>;
  }
}
