const path = require('path');

const buildConfig = require('../build.config.js');

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.(js|jsx)?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        babelrc: false,
        configFile: false,
        plugins: [
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-syntax-dynamic-import',
          '@loadable/babel-plugin',
        ],
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              loose: false,
              shippedProposals: true,
              useBuiltIns: 'usage',
            },
          ],
          '@babel/preset-react',
        ],
      },
    },
  });
  config.module.rules.push({
    test: /\.scss$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          url: true,
          import: true,
          localIdentName: buildConfig.cssTemplateClass,
        },
      },
      {
        loader: 'resolve-url-loader',
        options: {},
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          includePaths: [`./custom/_storybook`],
        },
      },
    ],
  });

  config.module.rules.push({
    test: /\.(png|jpg|jpeg|gif|ico)$/,
    loader: 'file-loader',
    include: [path.resolve(__dirname, './src/images')],
  });

  config.module.rules.push({
    test: /\.(svg$|po$)/,
    loader: 'raw-loader',
  });

  config.module.rules.forEach((data, key) => {
    if (data.test.toString().indexOf('svg|') >= 0) {
      config.module.rules[
        key
      ].test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;
      return false;
    }
  });

  return config;
};
