const messages = (getText, getPlural) => (key) =>
  ({
    postingToAlbum: getText('Posting to album') /* Names the album the user is posting to */,
    videoPostPage: getText(
      'Post a new video',
      'Video post page',
    ) /* Title of the video post page */,
  }[key]);

export default messages;
