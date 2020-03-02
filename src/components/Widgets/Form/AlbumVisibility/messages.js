const messages = (getText, getPlural) => (key) =>
  ({
    hidden: getText('Hidden') /* Choice for an album visibility setting */,
    visible: getText('Visible') /* Choice for an album visibility setting */,
    unlisted: getText('Unlisted') /* Choice for an album visibility setting */,
  }[key]);

export default messages;
