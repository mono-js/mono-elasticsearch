<h1 align="center"><img src="https://user-images.githubusercontent.com/904724/31045494-877e7d44-a5e5-11e7-8799-e3f73ed5ea20.png" width="350" alt="Mono Doc"/></h1>

> ElasticSearch module for [Mono](https://github.com/terrajs/mono)

[![npm version](https://img.shields.io/npm/v/@terrajs/mono-elasticsearch.svg)](https://www.npmjs.com/package/@terrajs/mono-elasticsearch)
[![Travis](https://img.shields.io/travis/terrajs/mono-elasticsearch/master.svg)](https://travis-ci.org/terrajs/mono-elasticsearch)
[![Coverage](https://img.shields.io/codecov/c/github/terrajs/mono-elasticsearch/master.svg)](https://codecov.io/gh/terrajs/mono-elasticsearch.js)
[![license](https://img.shields.io/github/license/terrajs/mono-elasticsearch.svg)](https://github.com/terrajs/mono-elasticsearch/blob/master/LICENSE)

## Installation

```bash
npm install --save @terrajs/mono-elasticsearch
```

Then, in your configuration file of your Mono application (example: `conf/application.js`):

```js
module.exports = {
  mono: {
    modules: ['@terrajs/mono-elasticsearch']
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
const { client } = require('@terrajs/mono-elasticsearch')

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
