const messages = (getText, getPlural) => (key) =>
  ({
    albums: getText('Albums', 'Navigation') /* Name of a page on the site */,
    gallery: getText('Gallery', 'Navigation') /* Name of a page on the site */,
    riders: getText('Riders', 'Navigation') /* Name of a page on the site */,
  }[key]);

export default messages;
