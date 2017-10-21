const { client } = require('../../../../')

module.exports = async function ({ conf, log }) {
	const index = conf.indexName = 'mono-elasticsearch'
	const type = conf.type = 'user'

	log.info(`Deleting ${index} index`)
	await client.indices.delete({
		index
	})

	log.info(`Creating ${index} index`)
	await client.indices.create({
		index
	})

	const nbDocs = 47
	log.info(`Inserting ${nbDocs} documents into index ${index}...`)

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
