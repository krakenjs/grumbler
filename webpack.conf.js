let webpack = require('webpack');
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const FILE_NAME = 'mylibrary';
const MODULE_NAME = 'mylibrary';

function getWebpackConfig({ filename, modulename, minify = false }) {

    return {

        resolve: {
            modules: [
                __dirname,
                'node_modules'
            ]
        },

        module: {
            rules: [
                {
                    test: /sinon\.js$/,
                    loader: "imports?define=>false,require=>false"
                },
                {
                    test: /\.js$/,
                    exclude: /(dist)/,
                    loader: 'babel-loader'
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
            library: modulename,
            pathinfo: false
        },
        bail: true,
        devtool: 'source-map',
        plugins: [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map'
            }),
            new webpack.DefinePlugin({
                __TEST__: false
            }),
            new webpack.NamedModulesPlugin(),
            new UglifyJSPlugin({
                test: /\.js$/,
                beautify: !minify,
                minimize: minify,
                compress: {
                    warnings: false,
                    sequences: minify
                },
                mangle: minify,
                sourceMap: true
            })
        ]
    };
}

module.exports.WEBPACK_CONFIG = getWebpackConfig({
    filename: `${FILE_NAME}.js`,
    modulename: MODULE_NAME
});

module.exports.WEBPACK_CONFIG_MIN = getWebpackConfig({
    filename: `${FILE_NAME}.min.js`,
    modulename: MODULE_NAME,
    minify: true
});
