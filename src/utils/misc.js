export const focusFirstFocusableItemInside = (parentEl) => {
  // Find the first focusable item. Stick to links for now.
  const links = parentEl.getElementsByTagName('a');
  if (links && links.length >= 1) {
    links[0].focus();
  }
};

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const renderDate = (date, locale) => {
  return date;
};