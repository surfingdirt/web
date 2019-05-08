import React from 'react';

import DualContainer from './DualContainer';

describe('Dual Container', () => {
  it('should render a dual container with only left element', () => {
    const wrapper = mount(
      <DualContainer>
        <span>Left Element</span>
      </DualContainer>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a dual container with left & right elements', () => {
    const wrapper = mount(
      <DualContainer>
        <span>Left Element</span>
        <span>Right Element</span>
      </DualContainer>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
