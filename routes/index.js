const express = require('express')
const jf = require('jsonfile')

const indexRouter = express.Router()
var cards = {}

// read content of cards from json file
jf.readFile('./public/json/content.json', function(err, obj) {
  console.log("./public/json/content.json loaded")
  cards = obj
});

// render index view
indexRouter.get('/', function (req, res) {
    console.log('indexRouter working')
    res.render('index', { cards: cards })
})

module.exports = indexRouter;