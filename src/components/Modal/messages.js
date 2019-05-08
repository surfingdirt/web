const messages = (getText, getPlural) => (key) =>
  ({
    labelClose: getText('Close', 'Modal') /* Label of a button to close a dialog window */,
    labelCancel: getText('Cancel', 'Modal') /* Label of a button to close a dialog window */,
  }[key]);

export default messages;
