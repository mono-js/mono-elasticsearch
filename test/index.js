const test = require('ava')
const { join } = require('path')

const elasticsearchModule = require('../lib/index')

const { start, stop } = require('mono-test-utils')

const { Client } = require('elasticsearch')

/*
** Tests are run in serial
*/

test('client should be undefined when connection not opened', (t) => {
	t.true(typeof elasticsearchModule.client === 'undefined')
	t.false(elasticsearchModule.client instanceof Client)
})

test('client should open a connection and expose the utils', async (t) => {
	const { server } = await start(join(__dirname, 'fixtures/ok/'), { env: 'with-host' })

	t.truthy(elasticsearchModule.searchValidation)
	t.truthy(elasticsearchModule.getSearchOptions)

	stop(server)
})

test('start() should log an error if no elasticsearch conf defined', async (t) => {
	const { server, stderr } = await start(join(__dirname, 'fixtures/ok/'), { env: 'no-conf' })

	t.truthy(elasticsearchModule.client)
	t.is(stderr.length, 1)
	t.true(stderr.join().includes('[mono-elasticsearch:mono-elasticsearch] No elasticsearch configuration found'))

	await stop(server)
})

test('start() should log an error if no elasticsearch conf hosts defined', async (t) => {
	const { server, stderr } = await start(join(__dirname, 'fixtures/ok/'), { env: 'empty-conf' })

	t.truthy(elasticsearchModule.client)
	t.is(stderr.length, 1)
	t.true(stderr[0].includes('[mono-elasticsearch:mono-elasticsearch] No elasticsearch configuration hosts found'))

	await stop(server)
})

test('start() should create a client with an host', async (t) => {
	const { server, stdout } = await start(join(__dirname, 'fixtures/ok/'), { env: 'with-host' })

	t.truthy(elasticsearchModule.client)
	t.true(stdout.join().includes('[mono-elasticsearch:mono-elasticsearch] Connecting to localhost:9200'))
	t.true(stdout.join().includes('[mono-elasticsearch:mono-elasticsearch] Connected to localhost:9200 hosts'))

	await stop(server)
})

test('start() should create a client with an array of hosts (string[])', async (t) => {
	const { server, stdout } = await start(join(__dirname, 'fixtures/ok/'), { env: 'multiple-hosts' })

	t.truthy(elasticsearchModule.client)
	t.true(stdout.join().includes('[mono-elasticsearch:mono-elasticsearch] Connecting to localhost:9200, localhost:9201'))
	t.true(stdout.join().includes('[mono-elasticsearch:mono-elasticsearch] Connected to localhost:9200, localhost:9201 hosts'))

	await stop(server)
})

test('start() should create a client with an array of hosts (object[])', async (t) => {
	const { server, stdout } = await start(join(__dirname, 'fixtures/ok/'), { env: 'multiple-hosts-object' })

	t.truthy(elasticsearchModule.client)
	t.true(stdout.join().includes('[mono-elasticsearch:mono-elasticsearch] Connecting to localhost:9200, localhost:9201'))
	t.true(stdout.join().includes('[mono-elasticsearch:mono-elasticsearch] Connected to localhost:9200, localhost:9201 hosts'))

	await stop(server)
})
