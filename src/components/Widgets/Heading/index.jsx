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
    id: PropTypes.string,
    link: PropTypes.string,
    tag: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    className: null,
    id: null,
    link: null,
    tag: null,
  };

  render() {
    const { className, children, id, link, tag, type } = this.props;
    const [defaultTag, defaultClassName] = typeMapping[type];

    const Tag = tag || defaultTag;
    const attrs = {
      className: classnames(styles.heading, styles[defaultClassName], className),
    };
    if (id) {
      attrs.id = id;
    }

    if (link) {
      return (
        <Link to={link} className={styles.titleLink}>
          <Tag {...attrs}>{children}</Tag>
        </Link>
      );
    }
    return <Tag {...attrs}>{children}</Tag>;
  }
}
