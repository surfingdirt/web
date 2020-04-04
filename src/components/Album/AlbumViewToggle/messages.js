const messages = (getText, getPlural) => (key) =>
  ({
    listView: getText('List') /* Label of a button to display items as a list */,
    gridView: getText('Grid') /* Label of a button to display items as a grid */,
  }[key]);

export default messages;
