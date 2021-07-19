"use strict"

const path = require('path');
const { merge } = require('webpack-merge');

const sharedConfig = require("../webpack.config");

module.exports = (env, options) => {

    const isDev = options.mode !== 'production';

    const config = {
        entry: {
            'examples': path.resolve(__dirname, 'index')
        },
        output: {
            path: path.join(__dirname, "../../docs"),
            filename: isDev ? "[name].js" : "[name].[contenthash].js",
        },
        devServer: {
            port: 8080,
            contentBase: path.join(__dirname, '../../docs'),
            publicPath: "/react-component-transition/",
            openPage: 'react-component-transition'
        }
    }

    return merge(sharedConfig(env, options), config);
}
