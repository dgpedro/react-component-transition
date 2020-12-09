"use strict"

const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, options) => {

    const isDev = options.mode !== 'production';

    return {
        devtool: isDev && "cheap-module-source-map",
        entry: {
            'examples': './examples/src/index'
        },
        output: {
            path: path.join(__dirname, "docs/dist"),
            filename: "[name].js",
            publicPath: "/docs/dist/",
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
            modules: [
                path.resolve('./src'),
                path.resolve(__dirname, 'node_modules')
            ]
        },
        module: {
            rules: [
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    loader: "babel-loader",
                },
                // IE support
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    include: [
                        path.resolve(__dirname, "node_modules/ansi-regex"),
                        path.resolve(__dirname, "node_modules/strip-ansi"),
                    ],
                    options: {
                        presets: [
                            "@babel/preset-env",
                        ],
                    }
                },
            ],
        },
        plugins: [
            new ForkTsCheckerWebpackPlugin(),
            // new BundleAnalyzerPlugin(),
        ],
        devServer: {
            compress: true,
            overlay: true,
            port: 8080,
            contentBase: path.join(__dirname, 'docs'),
            publicPath: "/react-component-transition/dist/",
            writeToDisk: true,
            historyApiFallback: {
                index: '/index.html'
            },
            open: true,
            openPage: 'react-component-transition'
        }
    }
}
