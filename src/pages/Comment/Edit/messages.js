const messages = (getText, getPlural) => (key) =>
  ({
    commentEditPage: getText(
      'Edit a comment',
      'Comment edit page',
    ) /* Title of the comment edition page */,
  }[key]);

export default messages;
