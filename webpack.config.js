module.exports = {
	entry: './js/index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'index.js',
		libraryTarget: 'var',
		library: 'pubcore',
		libraryExport: 'default'
	}
}
