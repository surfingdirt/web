import PropTypes from 'prop-types';
import React from 'react';

import FooterContent from 'Sections/FooterContent';
import NavigationContent from 'Sections/NavigationContent';

import { PAGE_TOP_ID } from 'Utils/shelfUtils';

const Layout = ({ navItems, children }) => (
  <div className="pageRoot" id={PAGE_TOP_ID}>
    <nav className="topLevelLandmark navigation">
      <NavigationContent items={navItems} />
    </nav>
    <div className="mainWrapper">
      <main className="topLevelLandmark main">{children}</main>
      <footer className="topLevelLandmark footer">
        <FooterContent />
      </footer>
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  navItems: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Layout;
