const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = function (options) {
  options.plugins = (options.plugins || []).filter(
    (plugin) => !(plugin instanceof ForkTsCheckerWebpackPlugin),
  );
  options.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        memoryLimit: 8192,
        configFile: require('path').resolve(__dirname, 'apps/api/tsconfig.app.json'),
      },
    }),
  );
  return options;
};
