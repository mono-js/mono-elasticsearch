const Joi = require('joi')
const { client, searchValidation, getSearchOptions } = require('../../../..')

const { conf } = require('@terrajs/mono')

module.exports = [
	{
		method: 'get',
		path: '/options',
		validate: {
			query: Joi.object().keys(searchValidation)
		},
		handler: (req, res) => res.json(getSearchOptions(req.query))
	},
	{
		method: 'get',
		path: '/',
		validate: {
			query: Joi.object().keys(searchValidation)
		},
		async handler(req, res) {
			const options = getSearchOptions(req.query)
			const response = await client.search({
				index: conf.indexName,
				type: conf.type,
				size: options.limit,
				from: options.limit * options.offset,
				body: {
					query: {
						'match_all': {}
					}
				}
			})

			res.json(response.hits)
		}
	}
]
