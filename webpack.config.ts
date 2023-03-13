import webpack, { Configuration as WebpackConfig } from "webpack";
import { Configuration as WebpackDevServerConfig } from "webpack-dev-server";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

interface Configuration extends WebpackConfig {
  devServer?: WebpackDevServerConfig;
}

const isDevelopment = process.env.NODE_ENV !== "production";

const webpackConfig: Configuration = {
  name: "searchTrees",
  mode: isDevelopment ? "development" : "production",
  devtool: !isDevelopment ? "hidden-source-map" : "eval",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", "json"],
  },
  entry: {
    app: "./index.tsx",
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: "entry",
                corejs: "3.22",
                debug: isDevelopment,
              },
            ],
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
          exclude: path.join(__dirname, "node_modules"),
        },
      },
      {
        test: /\.scss/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: `assets/images/[name][ext]`,
        },
      },
      {
        test: /\.(ttf)$/,
        type: "asset",
        generator: {
          filename: `assets/fonts/[name][ext]`,
        },
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? "development" : "production" }),
    new HtmlWebpackPlugin({
      template: `${path.resolve(__dirname)}/index.html`,
    }),
  ],
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js",
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    port: 8080,
    open: true,
    static: { directory: path.resolve(__dirname) },
  },
};

if (isDevelopment && webpackConfig.plugins) {
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
}

if (!isDevelopment && webpackConfig.plugins) {
  webpackConfig.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
  webpackConfig.plugins.push(new CleanWebpackPlugin());
}

export default webpackConfig;
