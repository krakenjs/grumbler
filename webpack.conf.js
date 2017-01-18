import webpack from 'webpack';

export let FILE_NAME = 'mylibrary';
export let MODULE_NAME = 'mylibrary';

function getWebpackConfig(filename) {

    return {
      module: {
        loaders: [
          {
            test: /sinon\.js$/,
            loader: "imports?define=>false,require=>false"
          },
          {
            test: /\.js$/,
            exclude: /(dist)/,
            loader: 'babel'
          },
          {
            test: /\.(html?|css|json)$/,
            loader: 'raw-loader'
          }
        ]
      },
      output: {
        filename: filename,
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: MODULE_NAME,
        pathinfo: false
      },
      bail: true,
      devtool: 'source-map',
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          test: /\.js$/,
          beautify: true,
          minimize: false,
          compress: false,
          mangle: false
        }),
        new webpack.DefinePlugin({
            __TEST__: false
        }),
        new webpack.NamedModulesPlugin()
      ]
    };
}

function getWebpackConfigMin(filename) {

    let config = getWebpackConfig(filename);

    config.plugins = [
        new webpack.optimize.UglifyJsPlugin({
            test: /\.js$/,
            minimize: true
        }),
        new webpack.DefinePlugin({
            __TEST__: false
        })
    ];

    return config;
}

export let WEBPACK_CONFIG_MAJOR = getWebpackConfig(`${FILE_NAME}.js`);
export let WEBPACK_CONFIG_MAJOR_MIN = getWebpackConfigMin(`${FILE_NAME}.min.js`);
