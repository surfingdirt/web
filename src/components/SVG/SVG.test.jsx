import React from 'react';
import SVG from './SVG';

// SVG objects passed in are actually strings!
const Icon = `<svg><g></g></svg>`;

describe('SVG', () => {
  it('should render a full icon', () => {
    const wrapper = mount(<SVG icon={Icon} presentationOnly />);
    expect(wrapper).toMatchSnapshot();

    const svg = wrapper.find('span.SVGInline');
    expect(svg).toHaveLength(1);

    const classNames = svg.props().className;
    expect(classNames).toContain('full');
    expect(classNames).not.toContain('hollow');
    expect(classNames).not.toContain('active');
  });

  it('should render a hollow icon', () => {
    const wrapper = mount(<SVG icon={Icon} hollow presentationOnly />);
    expect(wrapper).toMatchSnapshot();

    const svg = wrapper.find('span.SVGInline');
    expect(svg).toHaveLength(1);

    const classNames = svg.props().className;
    expect(classNames).not.toContain('full');
    expect(classNames).toContain('hollow');
    expect(classNames).not.toContain('active');
  });

  it('should render an active icon', () => {
    const wrapper = mount(<SVG icon={Icon} active presentationOnly />);
    expect(wrapper).toMatchSnapshot();

    const svg = wrapper.find('span.SVGInline');
    expect(svg).toHaveLength(1);

    const classNames = svg.props().className;
    expect(classNames).toContain('full');
    expect(classNames).not.toContain('hollow');
    expect(classNames).toContain('active');
  });

  it('should render an active hollow icon', () => {
    const wrapper = mount(<SVG icon={Icon} hollow active presentationOnly />);
    expect(wrapper).toMatchSnapshot();

    const svg = wrapper.find('span.SVGInline');
    expect(svg).toHaveLength(1);

    const classNames = svg.props().className;
    expect(classNames).not.toContain('full');
    expect(classNames).toContain('hollow');
    expect(classNames).toContain('active');
  });

  it('should add a class name', () => {
    const wrapper = mount(<SVG icon={Icon} className="toto" presentationOnly />);
    expect(wrapper).toMatchSnapshot();

    const svg = wrapper.find('span.SVGInline');
    expect(svg).toHaveLength(1);

    const classNames = svg.props().className;
    expect(classNames).toContain('toto');
  });

  it('should not render a label', () => {
    const wrapper = mount(<SVG icon={Icon} label="my icon" />);
    expect(wrapper).toMatchSnapshot();

    const svg = wrapper.find('span.SVGInline');
    expect(svg).toHaveLength(1);

    expect(svg.props()['aria-label']).toEqual('my icon');
  });
});
