const messages = (getText, getPlural) => (key) =>
  ({
    description: getText('Description', 'Keep On Trucking') /* Description */,
    title: getText('Title', 'Keep On Trucking') /* Title */,
  }[key]);

export default messages;
