const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        buffer: require.resolve('buffer/'),
        timers: require.resolve('timers-browserify')
      };
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
        })
      );
      return webpackConfig;
    },
  },
};
