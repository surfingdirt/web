const messages = (getText, getPlural) => (key) =>
  ({
    matrixArticle: getText(
      'Leon Dove tells you all about his new tweak to get the best out of the MBS Matrix II trucks.',
      'Homepage Aside',
    ) /* Description for an article */,
    the2020FourDown: getText(
      'Another year, another edition of the video contest, with 4 new productions from all around the world.',
      'Homepage Aside',
    ) /* Description for an article */,
  }[key]);

export default messages;
