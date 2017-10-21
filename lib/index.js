const { Client } = require('elasticsearch')

module.exports = async function ({ conf, log }) {
	const elasticsearch = conf.mono.elasticsearch
	if (!elasticsearch) return log.error('No elasticsearch configuration found')
	if (!elasticsearch.host && !elasticsearch.hosts) return log.error('No elasticsearch configuration hosts found')

	// Defaults
	elasticsearch.searchLimitDefault = elasticsearch.searchLimitDefault || 20
	elasticsearch.searchLimitMax = elasticsearch.searchLimitMax || 100

	let hostName = ''
	if (elasticsearch.host) hostName = elasticsearch.host
	if (elasticsearch.hosts) {
		hostName = elasticsearch.hosts.map((host) => {
			return (typeof host === 'string') ? host : `${host.host}:${host.port}`
		}).join(', ')
	}

	log.info(`Connecting to ${hostName}...`)
	module.exports.client = await new Client(elasticsearch)
	log.info(`Connected to ${hostName} hosts`)

	// expose Utils
	const utils = require('./utils')
	module.exports.searchValidation = utils.searchValidation
	module.exports.getSearchOptions = utils.getSearchOptions
}
