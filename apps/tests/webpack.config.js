"use strict"

const path = require('path');
const { merge } = require('webpack-merge');

const sharedConfig = require("../webpack.config");

module.exports = (env, options) => {

    const isDev = options.mode !== 'production';

    const config = {
        entry: {
            'tests': path.resolve(__dirname, 'index')
        },
        output: {
            path: path.join(__dirname, "dist")
        },
        devServer: {
            port: 9000,
            publicPath: "/"
        }
    }

    return merge(sharedConfig(env, options), config);
}
