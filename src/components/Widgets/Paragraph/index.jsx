import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import DropCap from 'Components/Widgets/DropCap';

import styles from './styles.scss';
import AutoLink from 'Components/Widgets/AutoLink';

const STANDARD = 'standard';
export const paragraphTypes = { STANDARD };

const classMapping = {
  [STANDARD]: null,
};

const insertDropCap = (initialChildren, ugc, withAutoLink) => {
  const children = React.Children.toArray(initialChildren);
  // Naive implementation: starting a paragraph with a <span> or any other element will fail:
  if (typeof children[0] === 'string') {
    const [firstWord, ...rest] = children[0].split(' ');
    const restOfText = rest.join(' ');

    children[0] = (
      <Fragment key={0}>
        <DropCap word={firstWord} />
        {withAutoLink ? <AutoLink ugc={ugc}>{restOfText}</AutoLink> : restOfText}
      </Fragment>
    );
    return children;
  }

  console.error('Cannot insert Dropcap to paragraph because it does not start with text');
  return initialChildren;
};

export default class Paragraph extends React.PureComponent {
  static propTypes = {
    type: (props, propName, componentName) => {
      const type = props[propName];
      if (!type) {
        return new Error(`Empty type set for component '${componentName}'`);
      }

      if (!Object.values(paragraphTypes).includes(type)) {
        return new Error(`Invalid type set for component '${componentName}': '${type}'`);
      }

      return undefined;
    },
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    dataContent: PropTypes.string,
    ugc: PropTypes.bool,
    withAutoLink: PropTypes.bool,
    withDropCap: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    dataContent: null,
    type: STANDARD,
    ugc: false,
    withAutoLink: false,
    withDropCap: false,
  };

  render() {
    const { children, className, dataContent, type, ugc, withAutoLink, withDropCap } = this.props;

    const typeClassName = classMapping[type];
    const actualClassName = classnames(styles.default, styles[typeClassName], className, {
      [styles.ugc]: ugc,
    });

    const attrs = dataContent ? { 'data-content': dataContent } : {};

    return (
      <p className={actualClassName} {...attrs}>
        {withDropCap ? (
          insertDropCap(children, ugc, withAutoLink)
        ) : withAutoLink ? (
          <AutoLink ugc={ugc}>{children}</AutoLink>
        ) : (
          children
        )}
      </p>
    );
  }
}
