import PropTypes from 'prop-types';
import React, { Fragment, PureComponent } from 'react';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.css';

export default class Slider extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    // See http://react-responsive-carousel.js.org/storybook/ for supported settings
    const { children, ...settings } = this.props;

    return (
      <Fragment>
        <Carousel {...settings} useKeyboardArrows>
          {children}
        </Carousel>
      </Fragment>
    );
  }
}
