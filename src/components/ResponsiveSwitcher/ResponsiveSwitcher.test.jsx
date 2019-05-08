import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import contexts from '~/contexts';
import { standardScreenWidths } from '~/responsiveConfig';

import ResponsiveSwitcher from './ResponsiveSwitcher';

const { MOBILE_LOW, DESKTOP_LOW } = standardScreenWidths;

// noinspection JSUnusedLocalSymbols
const { AppContext } = contexts;

const VersionA = ({ className }) => <div className={classnames(className, 'version-a')} />;
VersionA.propTypes = { className: PropTypes.string };
VersionA.defaultProps = { className: '' };

const VersionB = ({ className }) => <div className={classnames(className, 'version-b')} />;
VersionB.propTypes = { className: PropTypes.string };
VersionB.defaultProps = { className: '' };

const widthToComponentMap = {
  [MOBILE_LOW]: VersionA,
  [DESKTOP_LOW]: VersionB,
};

const getRenderedMarkup = (context, map) =>
  mount(
    <AppContext.Provider value={context}>
      <ResponsiveSwitcher widthToComponentMap={map}>
        <VersionA />
        <VersionB />
      </ResponsiveSwitcher>
    </AppContext.Provider>,
  );

describe('ResponsiveSwitcher', () => {
  it('should render the server-side version of the markup', () => {
    const wrapper = getRenderedMarkup({ SSR: true }, widthToComponentMap);
    expect(wrapper).toMatchSnapshot();

    // VersionA is rendered within an element with class screenwidth-320-only
    const version320 = wrapper.find('.screenwidth-320-only');
    expect(version320).toHaveLength(1);
    const versionA = version320.find('.version-a');
    expect(versionA).toHaveLength(1);

    // VersionB is rendered within an element with class screenwidth-1024-only
    const version1024 = wrapper.find('.screenwidth-1024-only');
    expect(version1024).toHaveLength(1);
    const versionB = version1024.find('.version-b');
    expect(versionB).toHaveLength(1);
  });

  it('should render client-side markup for a low-end mobile device', () => {
    global.innerWidth = 320;

    const wrapper = getRenderedMarkup({ SSR: false }, widthToComponentMap);
    expect(wrapper).toMatchSnapshot();

    const divs = wrapper.children();

    const div320 = divs.at(0);
    expect(div320.hasClass('screenwidth-320-only')).toBeTruthy();
    const versionA = div320.find('.version-a');
    expect(versionA).toHaveLength(1);

    // 1024 element is hidden
    expect(divs.at(1).getDOMNode().hidden).toBeTruthy();
  });

  it('should render client-side markup for a low-end mobile device if the resolution is below minimum', () => {
    global.innerWidth = 100;

    const wrapper = getRenderedMarkup({ SSR: false }, widthToComponentMap);
    expect(wrapper).toMatchSnapshot();

    const divs = wrapper.children();

    const div320 = divs.at(0);
    expect(div320.hasClass('screenwidth-320-only')).toBeTruthy();
    const versionA = div320.find('.version-a');
    expect(versionA).toHaveLength(1);

    // 1024 element is hidden
    expect(divs.at(1).getDOMNode().hidden).toBeTruthy();
  });

  it('should render client-side markup for a high-end desktop device', () => {
    global.innerWidth = 1024;

    const wrapper = getRenderedMarkup({ SSR: false }, widthToComponentMap);
    expect(wrapper).toMatchSnapshot();

    const divs = wrapper.children();
    // 320 element is hidden
    expect(divs.at(0).getDOMNode().hidden).toBeTruthy();

    const div1024 = divs.at(1);
    expect(div1024.hasClass('screenwidth-1024-only')).toBeTruthy();
    const versionB = div1024.find('.version-b');
    expect(versionB).toHaveLength(1);
  });
});
