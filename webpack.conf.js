import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

export let FILE_NAME = 'mylibrary';
export let MODULE_NAME = 'mylibrary';

function getWebpackConfig(filename) {

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
            library: MODULE_NAME,
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
                beautify: true,
                minimize: false,
                compress: {
                    warnings: false,
                    sequences: false
                },
                mangle: false,
                sourceMap: true
            })
        ]
    };
}

function getWebpackConfigMin(filename) {

    let config = getWebpackConfig(filename);

    config.plugins = [
        new webpack.SourceMapDevToolPlugin({
             filename: '[file].map'
        }),
        new webpack.DefinePlugin({
            __TEST__: false
        }),
        new webpack.NamedModulesPlugin(),
        new UglifyJSPlugin({
            test: /\.js$/,
            beautify: false,
            minimize: true,
            compress: {
                warnings: false,
                sequences: true
            },
            mangle: true,
            sourceMap: true
        })
    ];

    return config;
}

export let WEBPACK_CONFIG_MAJOR = getWebpackConfig(`${FILE_NAME}.js`);
export let WEBPACK_CONFIG_MAJOR_MIN = getWebpackConfigMin(`${FILE_NAME}.min.js`);
