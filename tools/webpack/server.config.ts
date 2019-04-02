import {getAbsolutePath} from '../../src/server/utils/fs';

export default ({mode}: any) => {
    return {
        mode,
        target: 'node',
        context: getAbsolutePath('./'),
        entry: {
            server: [
                getAbsolutePath(`./src/server/app.ts`)
            ]
        },
        output: {
            filename: '[name].bundle.js',
            path: getAbsolutePath('./build/')
        },
        devtool: 'inline-source-map',
        resolve: {
            extensions: ['.ts', '.tsx', '.json'],
            alias: {
                server: getAbsolutePath('./src/server')
            }
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        transpileOnly: true,
                        compilerOptions: {target: 'es5'}
                    }
                }
            ]
        },
        externals: {},
        plugins: [],
        optimization: {
            minimize: false
        }
    };
};
