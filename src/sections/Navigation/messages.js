const messages = (getText, getPlural) => (key) =>
  ({
    albums: getText('Albums', 'Navigation') /* Name of a page on the site */,
    close: getText('Close', 'Navigation') /* Label for a button to close the navigation menu */,
    gallery: getText('Gallery', 'Navigation') /* Name of a page on the site */,
    linkNav: getText(
      'Links',
      'Navigation',
    ) /* Label for a section containing links to pages on the site */,
    riders: getText('Riders', 'Navigation') /* Name of a page on the site */,
  }[key]);

export default messages;
