// This list should be the only place to add/modify breakpoint information for
// responsive design. Storybook, page-level media queries use this configuration.
const MOBILE_LOW = 'MOBILE_LOW';
const MOBILE_HI = 'MOBILE_HI';
const DESKTOP_LOW = 'DESKTOP_LOW';
const DESKTOP_HI = 'DESKTOP_HI';

const entries = [
  {
    id: MOBILE_LOW,
    displayName: 'Low-end mobile',
    width: 320,
    height: 480,
  },
  {
    id: MOBILE_HI,
    displayName: 'High-end mobile',
    width: 360,
    height: 640,
  },
  {
    id: DESKTOP_LOW,
    displayName: 'Low-end desktop',
    width: 1024,
    height: 768,
  },
  {
    id: DESKTOP_HI,
    displayName: 'High-end desktop',
    width: 1920,
    height: 1080,
  },
];

export const getClassNameForWidth = (width) => `screenwidth-${width}-only`;

export const standardScreenWidths = {};
export const storybookViewports = {};
export const screenWidthClassNames = {};

entries.forEach((entry) => {
  const { id, width, height, displayName } = entry;

  standardScreenWidths[id] = width;
  storybookViewports[id] = {
    name: displayName,
    styles: {
      width: `${width}px`,
      height: `${height}px`,
    },
    width,
    height,
  };
  screenWidthClassNames[id] = getClassNameForWidth(width);
});

export const getActiveScreenWidth = (screenWidth) => {
  const widths = Object.values(standardScreenWidths).sort((a, b) => a - b);

  let activeWidth = widths[0];
  widths.forEach((width) => {
    if (screenWidth >= width) {
      activeWidth = width;
    }
  });

  return activeWidth;
};

/**
 * TODO: figure out a way to make these rules dynamic (SASS), and constructed at build time.
 */
export const mediaQueryRules = {
  [standardScreenWidths[MOBILE_LOW]]: `
`,

  [standardScreenWidths[MOBILE_HI]]: `
`,

  [standardScreenWidths[DESKTOP_LOW]]: `
  .limitedWidthContent {
    width: 960px;
  }
`,

  [standardScreenWidths[DESKTOP_HI]]: `
  .limitedWidthContent {
    width: 1464px;
  }
  
  .fullWidthContent {
    width: 1900px;
  }
`,
};
