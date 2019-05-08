const messages = (getText) => (key) =>
  ({
    titleTemplate: getText('Israel Pro Football Leagues', 'HeadMetaData') /* Title template */,
  }[key]);

export default messages;
