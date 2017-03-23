var express = require('express')

express()
  .get('/', function (req, res) {
    res.send('Hello World Justus')
  })
  .listen(3000)
