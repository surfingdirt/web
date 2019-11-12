const messages = (getText) => (key) =>
  ({
    titleTemplate: getText('Title of the site', 'HeadMetaData') /* Title template */,
  }[key]);

export default messages;
