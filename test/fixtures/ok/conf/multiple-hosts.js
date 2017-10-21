const { join } = require('path')

module.exports = {
	mono: {
		modules: [
			join(__dirname, '../../../../')
		],
		elasticsearch: {
			hosts: [
				'localhost:9200',
				'localhost:9201'
			]
		}
	}
}
