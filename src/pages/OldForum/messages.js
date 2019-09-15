const messages = (getText, getPlural) => (key) =>
  ({
    title: getText('The Surfing Dirt Forum', 'OldForum') /* Title of the Forum page */,
    paragraph1: getText(
      "Are you looking for the old Surfing Dirt Forum? Don't worry, it's still around!",
      'OldForum',
    ) /* Paragraph */,
    paragraph2: getText(
      "We haven't managed to merge the forum into the new site, but we're thinking it will happen some day.",
      'OldForum',
    ) /* Paragraph */,
    paragraph3: getText(
      'In the meantime, go check it out, it may look different than it used to, but the great content is still there!',
      'OldForum',
    ) /* Paragraph */,
    go: getText('Go to the forum!', 'OldForum') /* Paragraph */,
  }[key]);

export default messages;
