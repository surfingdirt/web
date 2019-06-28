import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import AppContext from '~/contexts';
import { getActiveScreenWidth, getClassNameForWidth } from '~/responsiveConfig';

/*
 * Example
 * <ResponsiveSwitcher widthToComponentMap={...}>
 *	<ResponsiveVersionRed />
 *	<ResponsiveVersionGreen />
 *	<ResponsiveVersionBlue />
 * </ResponsiveSwitcher>
 */

export default class ResponsiveSwitcher extends React.PureComponent {
  // noinspection JSUnusedGlobalSymbols
  static contextType = AppContext;

  static propTypes = {
    children: PropTypes.node.isRequired,
    widthToComponentMap: PropTypes.objectOf(PropTypes.func).isRequired,
  };

  constructor(props) {
    super(props);

    const screenWidth = typeof window === 'undefined' ? 0 : window.innerWidth;

    this.state = { activeScreenWidth: getActiveScreenWidth(screenWidth) };

    this.resizeListener = this.resizeListener.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeListener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  getPropsForChild(width, index) {
    // Filter out certain props before passing them on
    const childProps = {};
    const blacklist = ['children', 'widthToComponentMap'];
    const { props } = this;

    Object.keys(props).forEach((key) => {
      if (blacklist.includes(key)) {
        return;
      }
      childProps[key] = props[key];
    });

    childProps.key = `key-${index}`;

    return childProps;
  }

  getKey(i) {
    return `key-${i}`;
  }

  findComponentInList(list, activeComponent) {
    let component = null;
    React.Children.forEach(list, (currentChild) => {
      if (currentChild.type === activeComponent) {
        component = currentChild;
      }
    });

    if (!component) {
      throw new Error(
        `Could not find component of type ${activeComponent} among the ResponsiveSwitcher direct descendants`,
      );
    }

    return component;
  }

  resizeListener() {
    this.setState({ activeScreenWidth: getActiveScreenWidth(window.innerWidth) });
  }

  renderChildWithContainer(width, component, i) {
    return (
      <div key={this.getKey(i)} className={classnames(getClassNameForWidth(width))}>
        {React.cloneElement(component, this.getPropsForChild(width, i))}
      </div>
    );
  }

  renderChildren(children, widthToComponentMap, clientSide, activeScreenWidth) {
    const $children = [];

    const activeComponent = widthToComponentMap[activeScreenWidth] || null;

    Object.entries(widthToComponentMap).forEach(([widthAsString, currentComponent], i) => {
      const width = parseInt(widthAsString, 10);
      let $child;

      if (clientSide) {
        if (width !== activeScreenWidth) {
          // On the client, render unnecessary components as empty, hidden divs.
          $child = <div hidden key={this.getKey(i)} />;
        } else {
          const component = this.findComponentInList(children, activeComponent);
          $child = this.renderChildWithContainer(width, component, i);
        }
      } else {
        const component = this.findComponentInList(children, currentComponent);
        $child = this.renderChildWithContainer(width, component, i);
      }

      $children.push($child);
    });
    return $children;
  }

  render() {
    const { SSR } = this.context;

    const { activeScreenWidth } = this.state;
    const { children, widthToComponentMap } = this.props;

    return this.renderChildren(children, widthToComponentMap, !SSR, activeScreenWidth);
  }
}
