module.exports = {
  verbose: true,
  setupTestFrameworkScriptFile: './src/setupTests.js',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(svg|png)$': '<rootDir>/src/fakeSVG.js',
  },
  transform: {
    '.*': 'babel-jest',
  },
};
