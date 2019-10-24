const messages = (getText, getPlural) => (key) =>
  ({
    inAlbum: getText('In album') /* Indicates which album a given item belongs to */,
    postedBy: getText('Posted by') /* Indicates who posted a given item */,
    videoContent: getText('Video content') /* Label for a section containing a video */,
  }[key]);

export default messages;
