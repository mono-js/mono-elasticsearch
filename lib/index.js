const { Client } = require('elasticsearch')

module.exports = async function () {
	const log = this.log.module('mono-elasticsearch')
	const elasticsearch = this.conf.mono.elasticsearch
	if (!elasticsearch) return log.error('No elasticsearch configuration found')
	if (!elasticsearch.host && !elasticsearch.hosts) return log.error('No elasticsearch configuration hosts found')

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
}
