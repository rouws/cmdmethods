const express = require('express')
const jf = require('jsonfile')

const router = express.Router()
var cards = {}

// read content of cards from json file
jf.readFile('./public/json/content.json', function(err, obj) {
  console.log("./public/json/content.json loaded")
  cards = obj
});

// routes
router.get('/', function (req, res) {
    res.render('index', { cards: cards })
})
router.get('/:category', function (req, res) {
    res.render('category', {category: req.params.category, cards: cards})
})
router.get('/:category/:cardId', function (req, res) {
    res.render('card-detail', { card: cards[req.params.cardId]})
})

module.exports = router;