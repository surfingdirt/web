const buildConfig = require('./build.config');

const config = {
  plugins: [
    [
      'module-resolver',
      {
        alias: buildConfig.resolverAliases,
      },
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@7rulnik/react-loadable/babel',
    'dynamic-import-node',
    'import-graphql',
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        loose: false,
        shippedProposals: true,
        useBuiltIns: 'usage',
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
  ],
  env: {
    test: {
      plugins: ['require-context-hook'],
    },
  },
};

module.exports = config;
