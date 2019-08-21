const messages = (getText, getPlural) => (key) =>
  ({
    videoContent: getText('Video content') /* Label for a section containing a video */,
  }[key]);

export default messages;
