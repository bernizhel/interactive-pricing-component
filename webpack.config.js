const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');


const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

const postcssPlugins = () => {
    const plugins = [
        ['autoprefixer'],
        ['postcss-input-range'],
    ];
    if (!isDev) {
        plugins.push(['cssnano']);
    }
    return plugins;
}

const CSSLoaders = (...additional) => {
    const loaders = [
        MiniCSSExtractPlugin.loader,
        'css-loader',
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: postcssPlugins(),
                },
            },
        },
    ];
    if (additional) {
        additional.forEach(loader => loaders.push(loader));
    }
    return loaders;
}

const filename = ext => !isDev ? `[name].[contenthash].${ext}` : `[name].${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['@babel/polyfill', './index.js'],
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'public'),
    },
    resolve: {
        alias: {
            '@s': path.resolve(__dirname, 'src/styles'),
            '@i': path.resolve(__dirname, 'src/images'),
            '@': path.resolve(__dirname, 'src'),
        },
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        minimizer: [
            new CSSMinimizerPlugin(),
            new TerserWebpackPlugin(),
        ],
    },
    target: isDev ? 'web' : 'browserslist',
    devServer: {
        open: false,
        port: 3000,
    },
    devtool: isDev ? 'source-map' : false,
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            favicon: path.resolve(__dirname, 'src/images/favicon-32x32.png'),
            inject: 'body',
        }),
        new CleanWebpackPlugin(),
        new MiniCSSExtractPlugin({
            filename: filename('css'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: CSSLoaders(),
            },
            {
                test: /\.s[ac]ss$/,
                use: CSSLoaders('sass-loader'),
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.svg$/,
                use: ['inline-svg-loader'],
            },
            {
                test: /\.([ot]tf|woff2?)$/,
                use: ['file-loader'],
            },
        ],
    },
};