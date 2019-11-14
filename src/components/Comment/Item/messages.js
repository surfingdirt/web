const messages = (getText, getPlural) => (key) =>
  ({
    neutral: getText('neutral', 'Comments') /* Indicates a message was written in a neutral tone */,
    joking: getText('joking', 'Comments') /* Indicates a message was written in a joking tone */,
    angry: getText('angry', 'Comments') /* Indicates a message was written in an angry tone */,
    happy: getText('happy', 'Comments') /* Indicates a message was written in a happy tone */,
    sad: getText('sad', 'Comments') /* Indicates a message was written in a sad tone */,
  }[key]);

export default messages;
