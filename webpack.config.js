/* @flow */

// eslint-disable-next-line import/no-nodejs-modules
import path from 'path';

import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';

const FILE_NAME = 'mylibrary';
const MODULE_NAME = 'mylibrary';

type WebpackConfigOptions = {
    filename : string,
    modulename : string,
    minify? : boolean,
    options? : Object,
    vars? : { [string] : mixed }
};

function getWebpackConfig({ filename, modulename, minify = false, options = {}, vars = {} } : WebpackConfigOptions) : Object {

    return {

        entry: './src/index.js',

        output: {
            path:           path.resolve('./dist'),
            filename,
            libraryTarget:  'umd',
            umdNamedDefine: true,
            library:        modulename,
            pathinfo:       false
        },

        resolve: {
            modules: [
                __dirname,
                'node_modules'
            ]
        },

        module: {
            rules: [
                {
                    test:   /sinon\.js$/,
                    loader: 'imports?define=>false,require=>false'
                },
                {
                    test:    /\.js$/,
                    exclude: /(dist)/,
                    loader:  'babel-loader'
                },
                {
                    test:    /\.(html?|css|json)$/,
                    loader: 'raw-loader'
                }
            ]
        },

        bail: true,

        devtool: 'source-map',

        plugins: [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map'
            }),
            new webpack.DefinePlugin({
                __TEST__: false,
                ...vars
            }),
            new webpack.NamedModulesPlugin(),
            new UglifyJSPlugin({
                test:     /\.js$/,
                beautify: !minify,
                minimize: minify,
                compress: {
                    warnings:  false,
                    sequences: minify
                },
                mangle:    minify,
                sourceMap: true
            }),
            new CircularDependencyPlugin({
                exclude:     /node_modules/,
                failOnError: true
            })
        ],

        ...options
    };
}

export let WEBPACK_CONFIG = getWebpackConfig({
    filename:   `${ FILE_NAME }.js`,
    modulename: MODULE_NAME
});

export let WEBPACK_CONFIG_MIN = getWebpackConfig({
    filename:   `${ FILE_NAME }.min.js`,
    modulename: MODULE_NAME,
    minify:     true
});

export let WEBPACK_CONFIG_TEST = getWebpackConfig({
    filename:   `${ FILE_NAME }.js`,
    modulename: MODULE_NAME,
    options:    {
        devtool: 'inline-source-map'
    },
    vars: {
        __TEST__: true
    }
});

export default [ WEBPACK_CONFIG, WEBPACK_CONFIG_MIN ];
