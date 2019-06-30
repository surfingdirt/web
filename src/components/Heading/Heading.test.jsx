import React from 'react';

import Header from './Header';

describe('Header', () => {
  it('type "main" should render as an h1 with class "main"', () => {
    const wrapper = mount(<Heading type="main">This is a main h1 header</Header>);
    expect(wrapper).toMatchSnapshot();

    const header = wrapper.find('h1.main');
    expect(header).toHaveLength(1);
    expect(header.text()).toEqual('This is a main h1 header');
  });

  it('type "main" and className "override" should render as an h1 with class "main override"', () => {
    const wrapper = mount(
      <Heading type="main" className="override">
        This is a main h1 header with a class override
      </Header>,
    );
    expect(wrapper).toMatchSnapshot();

    const header = wrapper.find('h1.main.override');
    expect(header).toHaveLength(1);
    expect(header.text()).toEqual('This is a main h1 header with a class override');
  });

  it('type "main" and tag "h2" should render as an h2 with class "main"', () => {
    const wrapper = mount(
      <Heading type="main" tag="h2">
        This is a main h2 header
      </Header>,
    );
    expect(wrapper).toMatchSnapshot();

    const header = wrapper.find('h2.main');
    expect(header).toHaveLength(1);
    expect(header.text()).toEqual('This is a main h2 header');
  });
});
