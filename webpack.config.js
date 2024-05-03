
import path from 'path';

export default {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/ts/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist/js')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};