const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const package = require("./package.json");

const banner = `
  malaysia-postcodes v${
    package.version
  } (https://github.com/AsyrafHussin/npm-malaysia-postcodes)
  Copyright 2020-${new Date().getFullYear()} Asyraf Hussin
  Licensed under ISC (https://github.com/AsyrafHussin/npm-malaysia-postcodes/blob/main/LICENSE)
`;

const commonConfig = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "malaysiaPostcodes",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: banner,
      raw: false,
      entryOnly: true,
    }),
  ],
};

module.exports = () => {
  return [
    {
      ...commonConfig,
      mode: "development",
      devtool: false,
      output: {
        ...commonConfig.output,
        filename: "malaysia-postcodes.js",
      },
    },
    {
      ...commonConfig,
      mode: "production",
      output: {
        ...commonConfig.output,
        filename: "malaysia-postcodes.min.js",
      },
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            extractComments: false,
          }),
        ],
      },
    },
  ];
};
