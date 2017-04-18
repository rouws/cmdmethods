const express = require('express')
const jf = require('jsonfile')

const cardRouter = express.Router()
var cards = {}

// read content of cards from json file
jf.readFile('./public/json/content.json', function(err, obj) {
  console.log("./public/json/content.json loaded")
  cards = obj
});


cardRouter.get('/:category/:cardName', function (req, res) {
    console.log(req.params.cardName)
    res.render('card-detail', { card: cards[req.params.cardName] })
})

module.exports = cardRouter;
