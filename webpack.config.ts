import TerserPlugin from "terser-webpack-plugin";
import packageJson from "./package.json";
import path from "path";
import webpack from "webpack";

const banner = `
  malaysia-postcodes v${
    packageJson.version
  } (https://github.com/AsyrafHussin/npm-malaysia-postcodes)
  Copyright 2020-${new Date().getFullYear()} Asyraf Hussin
  Licensed under ISC (https://github.com/AsyrafHussin/npm-malaysia-postcodes/blob/main/LICENSE)
`;

const commonConfig: webpack.Configuration = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    library: "malaysiaPostcodes",
    libraryTarget: "umd",
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules|__tests__/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: banner,
      raw: false,
      entryOnly: true,
    }),
  ],
};

const config: webpack.Configuration[] = [
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

export default config;
