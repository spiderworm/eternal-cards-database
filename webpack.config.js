const path = require('path');

module.exports = [{
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'built'),
		filename: 'module.js'
	},
	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	},
	node: {
		fs: "empty"
	}
}];
