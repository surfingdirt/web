import React from 'react';

import Paragraph from './Paragraph';

describe('Paragraph', () => {
  it('type "basic" should render as an p with class "basic"', () => {
    const wrapper = mount(<Paragraph type="basic">This is a basic paragraph</Paragraph>);
    expect(wrapper).toMatchSnapshot();

    const header = wrapper.find('p.basic');
    expect(header).toHaveLength(1);
    expect(header.text()).toEqual('This is a basic paragraph');
  });

  it('type "basic" should render as an p with classes "basic" and "override"', () => {
    const wrapper = mount(
      <Paragraph type="basic" className="override">
        This is a basic paragraph with a class override
      </Paragraph>,
    );
    expect(wrapper).toMatchSnapshot();

    const header = wrapper.find('p.basic.override');
    expect(header).toHaveLength(1);
    expect(header.text()).toEqual('This is a basic paragraph with a class override');
  });
});
