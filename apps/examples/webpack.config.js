"use strict"

const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, options) => {

    const isDev = options.mode !== 'production';

    return {
        devtool: isDev && "cheap-module-source-map",
        entry: {
            'examples': path.resolve(__dirname, 'index')
        },
        output: {
            path: path.join(__dirname, "../../docs"),
            filename: isDev ? "[name].js" : "[name].[hash].js",
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
            plugins: [new TsconfigPathsPlugin()],
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
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'index.html'),
            }),
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    configFile: path.join(__dirname, '../../tsconfig-esm.json'),
                }
            }),
            // new BundleAnalyzerPlugin(),
        ],
        devServer: {
            compress: true,
            overlay: true,
            port: 8080,
            contentBase: path.join(__dirname, '../../docs'),
            publicPath: "/react-component-transition/",
            writeToDisk: true,
            historyApiFallback: {
                index: '/index.html'
            },
            open: true,
            openPage: 'react-component-transition'
        }
    }
}
