const messages = (getText, getPlural) => (key) =>
  ({
    by: getText('by', 'Album') /* Indicates who created an album (short version) */,
    startedBy: getText('Started by', 'Album') /* Indicates who created an album (long version) */,
    public: getText(
      'Public',
      'Album',
    ) /* Indicates all registered users can contribute to a given an album */,
  }[key]);

export default messages;
