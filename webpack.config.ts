import webpack, { Configuration } from 'webpack';

import TerserPlugin from 'terser-webpack-plugin';
import packageJson from './package.json';
import path from 'path';

const terserPlugin = new TerserPlugin({ extractComments: false });
const commonOptimization = {
  minimize: true,
  minimizer: [terserPlugin]
};

const banner = `
  malaysia-postcodes v${
    packageJson.version
  } (https://github.com/AsyrafHussin/npm-malaysia-postcodes)
  Copyright 2020-${new Date().getFullYear()} Asyraf Hussin
  Licensed under ISC (https://github.com/AsyrafHussin/npm-malaysia-postcodes/blob/main/LICENSE)
`;

const commonConfig: Configuration = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules|__tests__/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: banner,
      raw: false,
      entryOnly: true
    })
  ]
};

const umdConfig: Configuration = {
  ...commonConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'malaysia-postcodes.min.js',
    library: 'malaysiaPostcodes',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  mode: 'production',
  optimization: commonOptimization
};

const umdDevConfig: Configuration = {
  ...commonConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'malaysia-postcodes.js',
    library: 'malaysiaPostcodes',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  mode: 'development',
  optimization: { ...commonOptimization, minimize: false }
};

const commonJsConfig: Configuration = {
  ...commonConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  mode: 'production',
  optimization: commonOptimization
};

const config: Configuration[] = [umdConfig, umdDevConfig, commonJsConfig];

export default config;
