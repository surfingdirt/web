import React, { Fragment } from 'react';

import Slider from './Slider';

const children = (
  <Fragment>
    <div>
      <img src="#" alt="Legend 1" />
      <p className="legend">Legend 1</p>
    </div>
    <div>
      <img src="#" alt="Legend 2" />
      <p className="legend">Legend 2</p>
    </div>
  </Fragment>
);

describe('Slider', () => {
  it('should call a Carousel with default options', () => {
    const wrapper = shallow(<Slider showThumbs={false}>{children}</Slider>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render children wrapped in its own markup', () => {
    const wrapper = mount(<Slider showThumbs={false}>{children}</Slider>);
    expect(wrapper).toMatchSnapshot();

    const carouselRoot = wrapper.find('.carousel-slider');
    expect(carouselRoot).toHaveLength(1);

    const items = carouselRoot.find('li');
    expect(items).toHaveLength(2);

    expect(items.find('.legend')).toHaveLength(2);
    expect(
      items
        .find('.legend')
        .at(0)
        .text(),
    ).toEqual('Legend 1');
    expect(
      items
        .find('.legend')
        .at(1)
        .text(),
    ).toEqual('Legend 2');
  });
});
