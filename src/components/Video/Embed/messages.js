const messages = (getText, getPlural) => (key) =>
  ({
    error1: getText(
      "Whoops, Google doesn't want us to play this video!",
    ) /* Message displayed when a video won't play, probably because of copyright issues - part 1 */,
    error2: getText(
      'Click here to open YouTube instead.',
    ) /* Message displayed when a video won't play, probably because of copyright issues - part 2 */,
    videoContent: getText('Video content') /* Label for a section containing a video */,
  }[key]);

export default messages;
