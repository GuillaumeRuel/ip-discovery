const express = require('express')
const DiscoveryService = require('./discovery-service')

const app = express()
const port = 5000;

app.get('/', function (req, res) {
  res.send(DiscoveryService.foo());
})

app.listen(port)