import React from 'react';

import FormAPIMessage from 'Components/Widgets/Form/APIMessage';

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

  if (Date.now() - d > 12 * 3600 * 1000) {
    // More than 12h ago, display the full date and time
    return d.toLocaleDateString(locale, {
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  // Less than 12h ago, only display the time
  return d.toLocaleTimeString(locale);
};

const MAX_TITLE_LENGTH = 30;
export const truncateItemTitleForConfirmation = (title) => {
  let clamped = title;
  if (clamped.length > MAX_TITLE_LENGTH) {
    clamped = `${clamped.substr(0, MAX_TITLE_LENGTH)}…`;
  }

  return clamped;
};

export const handleMutationSubmit = (mutation) => {
  return async (input) => {
    const errors = {};
    try {
      await mutation({ variables: { input } });
    } catch (e) {
      const rawErrors =
        e.graphQLErrors &&
        e.graphQLErrors[0] &&
        e.graphQLErrors[0].extensions &&
        e.graphQLErrors[0].extensions.exception
          ? e.graphQLErrors[0].extensions.exception.errors
          : {};

      Object.entries(rawErrors).forEach(([name, errorList]) => {
        errors[name] = errorList.map((label, index) => (
          <FormAPIMessage key={index} message={label} />
        ));
      });
    }
    return errors;
  };
};
