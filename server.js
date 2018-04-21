#!/usr/bin/env node
'use strict';

const Webpack = require('webpack');
const WebpackDevServer = require('./node_modules/webpack-dev-server/lib/Server');
const webpackConfig = require('./webpack.config.js');

const compiler = Webpack(webpackConfig);
const devServerOptions = Object.assign({}, webpackConfig.devServer, {
    stats: {
        colors: true
    },
    disableHostCheck: true
});
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(process.env.PORT, process.env.IP, () => {
    console.log('Starting server...');
});