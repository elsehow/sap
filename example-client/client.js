#!/usr/bin/env node
var argv = process.argv.slice(2)
  , key = require('../config.js')

var payload = { 
  type: key,
  message: argv[0]
  //message: 'hello my furry, lovely friends'
}

var request = require('request-json')
var client = request.createClient('http://indra.webfactional.com')


client.post('/', payload, function(err, res, body) {
  console.log('posted')
})
