const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  
  const isProduction = env == 'production';
  const CSSExtract = new MiniCssExtractPlugin({ filename: 'styles.css' });

  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        test: /\.json/,
        type: 'javascript/auto',
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'file-loader',
          options: { name: '[name].[ext]' },
        }],
      },
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, 
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    sourceMap: true
                }
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }]
      }]
    },
    plugins: [
      CSSExtract
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'src', 'api', 'data')],
      historyApiFallback: true,
      publicPath: '/dist/',
      watchContentBase: true
    }
  };
};
