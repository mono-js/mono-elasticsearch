const Joi = require('joi')

const { conf } = require('@terrajs/mono')

exports.searchValidation = {
	limit: Joi.number().integer().min(1).max(conf.mono.elasticsearch.searchLimitMax).optional(),
	offset: Joi.number().integer().min(0).optional(),
	q: Joi.string().optional()
}

// Generate options for elasticsearch search()
exports.getSearchOptions = (query) => {
	const options = {
		limit: conf.mono.elasticsearch.searchLimitDefault,
		offset: 0
	}

	// Limit (?limit=5)
	if (query.limit) options.limit = Number(query.limit)
	// Offset (?offset=10)
	if (query.offset) options.offset = Number(query.offset)

	return options
}

