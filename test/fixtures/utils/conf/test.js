const { join } = require('path')

module.exports = {
	mono: {
		modules: [
			join(__dirname, '../../../..')
		],
		elasticsearch: {
			host: 'localhost:9200',
			searchdLimitMax: 20,
			searchLimitDefault: 5
		}
	}
}
