//3rd party service
const express = require('express');
const bodyParser = require('body-parser')

const DiscoveryService = require('./discovery-service');

const app = express();
const port = 5000;

// create application/json parser
var jsonParser = bodyParser.json()


app.get('/', async (req, res) => {

  const _ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || "";
  const map = await DiscoveryService.geo([_ip])
  res.status
  res.send(map);
})

app.post('/', jsonParser, async (req, res) => {

  const ips = req.body?.ips || [];
  const map = await DiscoveryService.geo(ips)
  if (typeof map !== "array") {
    res.status(400);
  }

  res.send(map);
})


app.listen(port)