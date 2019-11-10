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
  // Note: Server-side rendering is going to use one particular timeZone in order to render dates.
  // There is a high likelyhood that it won't match the user's client-side timezone, which means
  // React will end up re-rendering all date strings on the client.
  // Solution: store user's timezones on the server, which can only work for logged-in users.

  const r = new RegExp(/(\d{4}-\d{2}-\d{2})\s{1}(\d{2}:\d{2}:\d{2})/);
  const res = date.match(r);
  if (!res || res.length !== 3) {
    console.warn(`Could not parse date '${date}'`);
    return date;
  }

  const d = new Date(`${res[1]}T${res[2]}`);

  return d.toLocaleDateString(locale, {
    hour: 'numeric',
    minute: 'numeric',
  });
};