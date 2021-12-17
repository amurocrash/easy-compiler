const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',

  entry: "./src/app.ts",

  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "bundle.js",
  },

  module: {
    rules: [
      // 添加解析规则
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },

  resolve: {
    // 需要打包的文件后缀
    extensions: [".tsx", ".ts", ".js"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      // template: "index.html",
    }),
  ],

  // devServer: {
  //   contentBase: path.join(__dirname, "."),
  //   open: true,
  //   port: 9000,
  // },
}
