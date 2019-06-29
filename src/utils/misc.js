export const focusFirstFocusableItemInside = (parentEl) => {
  // Find the first focusable item. Stick to links for now.
  console.log(parentEl);
  const links = parentEl.getElementsByTagName('a');
  if (links && links.length >= 1) {
    links[0].focus();
  }
};