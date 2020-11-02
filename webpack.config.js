const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')

module.exports = {
	entry: './src/main.js',
	module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { 
			test: /\.vue$/, 
			use: 'vue-loader',
		},
		{ test: /\.css$/, use: ['vue-style-loader', 'css-loader']},
		{
			test: /\.s(c|a)ss$/,
			use: [
			  'vue-style-loader',
			  'css-loader',
			  'postcss-loader',
			  {
				 loader: 'sass-loader',
				 options: {
					implementation: require('sass')
				 },
			  },
			],
		 },
		 {
			test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader',
			options: {
			  name: '[name].[ext]'
			}
		 },
		 {
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader',
			options: {
			  name: '[name].[ext]'
			}
		 }
    ]
  },
  devServer: {
    open: true,
	 hot: true,
	 historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
};