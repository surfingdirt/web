const messages = (getText, getPlural) => (key) =>
  ({
    sitemap: getText('Sitemap', 'Sitemap') /* Header */,
    description: getText('Description', 'Sitemap') /* Description of the Sitemap page */,
    name: getText('Sitemap', 'Sitemap') /* Name of the Sitemap page */,
  }[key]);

export default messages;
