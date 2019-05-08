import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Button from './Button';

describe('Button', () => {
  it('Render a button element', () => {
    const wrapper = mount(<Button type="main" label="This is a main button" />);
    expect(wrapper).toMatchSnapshot();

    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
    expect(button.hasClass('mainButton')).toBeTruthy();
    expect(button.text()).toEqual('This is a main button');
  });

  it('Render a negative button element', () => {
    const wrapper = mount(<Button type="negative" label="This is a negative button" />);
    expect(wrapper).toMatchSnapshot();

    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
    expect(button.hasClass('mainButton')).toBeFalsy();
    expect(button.hasClass('negativeButton')).toBeTruthy();
    expect(button.text()).toEqual('This is a negative button');
  });

  it('Render a link', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Button href="toto" label="This is a button link" />
      </BrowserRouter>,
    );
    expect(wrapper).toMatchSnapshot();

    const button = wrapper.find('a');
    expect(button).toHaveLength(1);
    expect(button.hasClass('mainButton')).toBeTruthy();
    expect(button.text()).toEqual('This is a button link');
  });

  it('Render a loading button', () => {
    const wrapper = mount(
      <BrowserRouter>
        <Button label="Loading" loading />
      </BrowserRouter>,
    );
    expect(wrapper).toMatchSnapshot();

    const button = wrapper.find('button');
    expect(button).toHaveLength(1);
    expect(button.hasClass('loading')).toBeTruthy();

    const inlineSpinner = button.find('.inlineSpinner');
    expect(inlineSpinner).toHaveLength(1);
  });
});
