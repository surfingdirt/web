/* eslint-disable import/prefer-default-export */

import ejs from 'ejs';
import { screenWidthClassNames, standardScreenWidths, mediaQueryRules } from '../responsiveConfig';

export const generateMediaQueries = () => {
  const hideEverythingTemplate = `<%- selectors %>  {
  display: none;
}
`;
  const mediaQueryTemplate = `@media screen and <%- query %> {
  .screenwidth-<%- width %>-only {
    display: initial;
  }
  <%- additionalRules %>
}
`;

  const widths = Object.values(standardScreenWidths);

  const output = [];

  output.push(
    ejs.render(hideEverythingTemplate, {
      selectors: Object.values(screenWidthClassNames)
        .map((name) => `.${name}`)
        .join(',\n'),
    }),
  );

  widths.forEach((width, index) => {
    let query;

    // Screen width media query rule
    if (index === 0) {
      query = `(max-width: ${widths[1] - 1}px)`;
    } else if (index === widths.length - 1) {
      query = `(min-width: ${width}px)`;
    } else {
      query = `(min-width: ${width}px) and (max-width: ${widths[index + 1] - 1}px)`;
    }

    const additionalRules = mediaQueryRules[width];
    output.push(ejs.render(mediaQueryTemplate, { width, query, additionalRules }));
  });

  return output.join('\n\n');
};
