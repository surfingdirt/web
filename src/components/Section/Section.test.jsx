import React from 'react';

import Section from './Section';

describe('Section', () => {
  it('should render its children inside a div with a "section" class', () => {
    const wrapper = mount(
      <Section label="My title">
        <span>foo</span>
      </Section>,
    );
    expect(wrapper).toMatchSnapshot();

    const section = wrapper.find('section');
    expect(section).toHaveLength(1);

    const h2 = section.find('h2');
    expect(h2).toHaveLength(1);
    expect(h2.text()).toEqual('My title');

    const span = section.find('span');
    expect(span).toHaveLength(1);

    expect(span.text()).toEqual('foo');
  });
});
