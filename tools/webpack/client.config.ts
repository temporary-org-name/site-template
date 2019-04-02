import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';

import {getAbsolutePath} from '../../src/server/utils/fs';

const babelPlugins: any[] = [];

const babelOptions = {
    comments: true,
    presets: [
        '@babel/preset-react',
        '@babel/preset-env'
    ],
    plugins: babelPlugins
};

export default ({mode}: any) => {
    const isProduction = mode === 'production';

    return ['admin', 'main'].map((entry) => {
        return {
            mode,
            target: 'web',
            context: getAbsolutePath('./'),
            entry: {
                [entry]: [
                    getAbsolutePath(`./src/client/views/applications/${entry}`)
                ]
            },
            output: {
                filename: isProduction ? '[name].bundle.min.js' : '[name].bundle.js',
                path: getAbsolutePath('./build/')
            },
            devtool: 'source-map',
            resolve: {
                extensions: ['.ts', '.tsx', '.json'],
                alias: {
                    client: getAbsolutePath('./src/client')
                }
            },
            module: {
                rules: [
                    {
                        test: /\.jsx?$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: babelOptions
                            }
                        ]
                    },
                    {
                        test: /\.tsx?$/,
                        use: [
                            {
                                loader: 'babel-loader',
                                options: babelOptions
                            },
                            {
                                loader: 'awesome-typescript-loader',
                                options: {
                                    configFileName: getAbsolutePath('./src/client/tsconfig.json')
                                }
                            }
                        ]
                    },
                    {
                        test: /\.(sa|sc|c)ss$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            'sass-loader'
                        ]
                    },
                    {
                        test: /\.(png|jpg|jpeg|gif)$/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {},
                            },
                        ],
                    },
                ]
            },
            externals: {},
            plugins: [
                new MiniCssExtractPlugin({
                    filename: `[name].bundle${isProduction ? '.min' : ''}.css`
                })
            ],
            optimization: {
                minimize: isProduction,
                minimizer: [
                    new UglifyJsPlugin({
                        sourceMap: true
                    }),
                    new OptimizeCSSAssetsPlugin({})
                ]
            }
        };
    });
};
