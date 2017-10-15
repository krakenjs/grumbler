/* @flow */
/* eslint import/no-nodejs-modules: off */

import path from 'path';
import qs from 'querystring';

import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';

const FILE_NAME = 'mylibrary';
const MODULE_NAME = 'mylibrary';

const DEFAULT_VARS = {
    __TEST__: false,
    __MIN__:  false
};

type WebpackConfigOptions = {
    filename : string,
    modulename : string,
    minify? : boolean,
    options? : Object,
    vars? : { [string] : mixed }
};

function getWebpackConfig({ filename, modulename, minify = false, options = {}, vars = {} } : WebpackConfigOptions) : Object {

    vars = {
        ...DEFAULT_VARS,
        ...vars
    };

    const PREPROCESSOR_OPTS = {
        'ifdef-triple-slash': 'false',
        ...vars
    };

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
                    test:    /\.js$/,
                    loader: `ifdef-loader?${ qs.encode(PREPROCESSOR_OPTS) }`
                },
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
    minify:     true,
    vars:       {
        __MIN__: true
    }
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
