import test from 'ava'

import * as stdMock from 'std-mocks'
import { Client } from 'elasticsearch'

import start, { client } from '../src'

/*
** Tests are run in serial
*/

test('client should be undefined when connection not opened', (t) => {
	t.true(typeof client === 'undefined')
	t.false(client instanceof Client)
})

test('start() should log an error if no elasticsearch conf defined', async (t) => {
	stdMock.use()
	const ctx = {
		conf: {},
		log: {
			module: () => ctx.log,
			error: console.error
		}
	}
	await start.call(ctx)
	stdMock.restore()
	const { stdout, stderr } = stdMock.flush()
	t.falsy(client)
	t.is(stdout.length, 0)
	t.is(stderr.length, 1)
	t.true(stderr[0].includes('No elasticsearch configuration found'))
})

test('start() should log an error if no elasticsearch conf hosts defined', async (t) => {
	stdMock.use()
	const ctx = {
		conf: {
			elasticsearch: {}
		},
		log: {
			module: () => ctx.log,
			error: console.error
		}
	}
	await start.call(ctx)
	stdMock.restore()
	const { stdout, stderr } = stdMock.flush()
	t.falsy(client)
	t.is(stdout.length, 0)
	t.is(stderr.length, 1)
	t.true(stderr[0].includes('No elasticsearch configuration hosts found'))
})

test('start() should create a client with an host', async (t) => {
	stdMock.use()
	const ctx = {
		conf: {
			elasticsearch: {
				host: 'localhost:9200'
			}
		},
		log: {
			module: () => ctx.log,
			info: console.log
		}
	}
	await start.call(ctx)
	stdMock.restore()
	const { stdout, stderr } = stdMock.flush()
	t.truthy(client)
	t.is(stderr.length, 0)
	t.is(stdout.length, 2)
	t.true(stdout[0].includes('Connecting to'))
	t.true(stdout[1].includes('Connected to'))
})

test('start() should create a client with an array of hosts', async (t) => {
	stdMock.use()
	const ctx = {
		conf: {
			elasticsearch: {
				hosts: [
					'localhost:9200'
				]
			}
		},
		log: {
			module: () => ctx.log,
			info: console.log
		}
	}
	await start.call(ctx)
	stdMock.restore()
	const { stdout, stderr } = stdMock.flush()
	t.truthy(client)
	t.is(stderr.length, 0)
	t.is(stdout.length, 2)
	t.true(stdout[0].includes('Connecting to'))
	t.true(stdout[1].includes('Connected to'))
})

