<h1 align="center"><img src="https://user-images.githubusercontent.com/904724/31045677-26278654-a5e9-11e7-8acf-e63c394d04fc.png" width="350" alt="Mono ElasticSearch"/></h1>

> ElasticSearch module for [Mono](https://github.com/terrajs/mono)

[![npm version](https://img.shields.io/npm/v/mono-elasticsearch.svg)](https://www.npmjs.com/package/mono-elasticsearch)
[![Travis](https://img.shields.io/travis/terrajs/mono-elasticsearch/master.svg)](https://travis-ci.org/terrajs/mono-elasticsearch)
[![Coverage](https://img.shields.io/codecov/c/github/terrajs/mono-elasticsearch/master.svg)](https://codecov.io/gh/terrajs/mono-elasticsearch.js)
[![license](https://img.shields.io/github/license/terrajs/mono-elasticsearch.svg)](https://github.com/terrajs/mono-elasticsearch/blob/master/LICENSE)

## Installation

```bash
npm install --save mono-elasticsearch
```

Then, in your configuration file of your Mono application (example: `conf/application.js`):

```js
module.exports = {
  mono: {
    modules: ['mono-elasticsearch']
  }
}
```

## Configuration

Mono-elasticsearch will use the `elasticsearch` property of your configuration (example: `conf/development.js`):

```js
module.exports = {
  mono: {
    elasticsearch: {
      // See https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html
      host: 'localhost:9200'
    }
  }
}
```

## Usage

In your modules files, you can access `client` instance like this:

```js
const { client } = require('mono-elasticsearch')

client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});
```

## Utils

```js
const { SearchValidation, getSearchOptions } = require('mono-elasticsearch')
```

- `searchValidation: Object`: Joi object used for route validation inside Mono
- `getSearchOptions(req.query): Object`: Method to transform `req.query` into a usable object for elasticsearch `find`

The last 2 methods are useful to create easily listing routes with pagination restriction

You can see an example of how to use it in `test/fixtures/utils/src/utils.routes.js`.
