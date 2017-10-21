const test = require('ava')
const { join } = require('path')

const { start, stop, $get } = require('mono-test-utils')

let ctx

test.before('Start mono', async () => {
	ctx = await start(join(__dirname, 'fixtures/utils/'))
})

test('GET /options', async (t) => {
	const { body } = await $get(`/options`)

	t.is(body.limit, ctx.conf.mono.elasticsearch.searchLimitDefault)
	t.is(body.offset, 0)
})

test('GET /options?limit=3&offset=2', async (t) => {
	const { body } = await $get(`/options?limit=3&offset=2`)

	t.is(body.limit, 3)
	t.is(body.offset, 2)
})

test('GET /options?limit=0 -> FAIL', async (t) => {
	const { statusCode, body } = await $get(`/options?limit=0`)

	t.is(statusCode, 400)
	t.is(body.code, 'validation-error')
	t.is(body.context[0].field[0], 'limit')
})

test('GET /options?limit=1000 -> FAIL', async (t) => {
	const { statusCode, body } = await $get(`/options?limit=1000`)

	t.is(statusCode, 400)
	t.is(body.code, 'validation-error')
	t.is(body.context[0].field[0], 'limit')
})

test('GET /', async (t) => {
	const { body } = await $get(`/`)

	t.is(body.hits.length, 5)
})

test.after('Stop mono', async () => {
	await stop(ctx.server)
})
