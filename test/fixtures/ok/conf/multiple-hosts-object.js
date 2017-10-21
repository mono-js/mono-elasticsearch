const { join } = require('path')

module.exports = {
	mono: {
		modules: [
			join(__dirname, '../../../../')
		],
		elasticsearch: {
			hosts: [
				{
					protocol: 'http',
					host: 'localhost',
					port: 9200
				},
				{
					protocol: 'http',
					host: 'localhost',
					port: 9201
				}
			]
		}
	}
}
