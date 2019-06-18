import PropTypes from 'prop-types';
import React from 'react';

import FooterContent from 'Sections/FooterContent';
import NavigationContent from 'Sections/NavigationContent';
import Masthead from 'Sections/Masthead';

import { PAGE_TOP_ID } from 'Utils/shelfUtils';

const Layout = ({ children, title }) => (
  <div className="pageRoot" id={PAGE_TOP_ID}>
    <Masthead title={title} />
    <nav className="topLevelLandmark navigation">
      <NavigationContent />
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
};

export default Layout;
