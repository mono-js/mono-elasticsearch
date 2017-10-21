const { client } = require('../../../../')

module.exports = async function ({ conf }) {
	const index = conf.indexName = 'mono-elasticsearch'
	const type = conf.type = 'user'

	this.log.info(`Deleting ${index} index`)
	await client.indices.delete({
		index
	})

	this.log.info(`Creating ${index} index`)
	await client.indices.create({
		index
	})

	const nbDocs = 47
	this.log.info(`Inserting ${nbDocs} documents into index ${index}...`)

	for (let i = 1; i <= 47; i++) {
		await client.index({
			index,
			type,
			body: {
				username: `username${i}`
			},
			refresh: true
		})
	}
}
