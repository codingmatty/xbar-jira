const path = require("path");

module.exports = {
  target: "node",
  mode: "production",
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "jira.2h.js",
    path: path.resolve(__dirname, "dist"),
  },
};
