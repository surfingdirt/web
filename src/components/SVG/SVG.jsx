import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import SVGInline from 'react-svg-inline';

export default class SVG extends PureComponent {
  static propTypes = {
    // Whether to draw the icon as already activated.
    active: PropTypes.bool,
    className: PropTypes.string,
    // Hollow is for vectors where the outline is rendered through 'fill', not 'stroke'.
    hollow: PropTypes.bool,
    // The actual SVG string
    icon: PropTypes.string.isRequired,
    // The label to associate with the icon
    label: (props, propName) => {
      if (props[propName] === '') {
        throw new Error('Empty label should be replaced with presentationOnly.');
      }

      if (
        typeof props.onClick === 'function' &&
        typeof props[propName] === 'undefined' &&
        !props.presentationOnly
      ) {
        throw new Error('label is mandatory when providing an onClick listener.');
      }
      if (!props.presentationOnly && typeof props[propName] === 'undefined') {
        throw new Error('label is mandatory when icon is not just for presentation purposes.');
      }
    },
    // Click listener function
    onClick: PropTypes.func,
    // True if the icon is just for looks and should not be visible to screen readers.
    presentationOnly: PropTypes.bool,
    // Apply standard styles
    standardIcon: PropTypes.bool,
  };

  static defaultProps = {
    active: false,
    className: null,
    hollow: false,
    label: null,
    onClick: null,
    presentationOnly: false,
    standardIcon: false,
  };

  render() {
    const { className, active, icon, label, hollow, onClick, standardIcon } = this.props;

    const actualClassName = classnames(
      className,
      active ? 'active' : '',
      hollow ? 'hollow' : 'full',
      standardIcon ? 'standardIcon' : '',
    );

    const attributes = { svg: icon, className: actualClassName };
    if (label) {
      attributes['aria-label'] = label;
    }
    if (onClick) {
      attributes.onClick = onClick;
      attributes.role = 'button';
      attributes['aria-pressed'] = active;
    }

    return <SVGInline {...attributes} />;
  }
}
