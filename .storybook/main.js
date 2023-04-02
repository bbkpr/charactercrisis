const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    'storybook-addon-designs',
    '@storybook/addon-interactions',
    //'@storybook/addon-jest',
    '@storybook/addon-links',
    '@storybook/addon-measure',
    '@storybook/preset-scss',
    {
      name: '@storybook/addon-styling',
      options: {
        sass: {
          // Require your Sass preprocessor here
          implementation: require('sass')
        }
      }
    }
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5'
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true)
    }
  },
  webpackFinal: async (config) => {
    const scssConfigIndex = config.module.rules.findIndex((c) => '.scss'.match(c.test));
    if (scssConfigIndex > 0 && config.module.rules[scssConfigIndex]?.oneOf)
      config.module.rules[scssConfigIndex].oneOf.push({
        test: /\.(css|s(a|c)ss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../')
      });
    else
      config.module.rules.push({
        test: /\.(css|s(a|c)ss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, '../')
      });
    return {
      ...config,
      resolve: { ...config.resolve /*, alias*/ }
    };
  }
};
