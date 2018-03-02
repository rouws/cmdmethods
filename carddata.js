const shuffle = require('shuffle-array')
const jf = require('jsonfile')
const jsonfile = './public/json/content.json'


let cards = []

// read content of cards from json file
jf.readFile(jsonfile, function(err, obj) {
  if (err) throw err
  cards = obj
});

function getPreviousCardId(card) {
  // return cardId of previous card
  let index = cards.indexOf(card)
  index--
  while ((index < 0) || (cards[index].type == 'category-description')) {
    index < 0 ? index = cards.length-1 : index--
  }
  return cards[index].id
}

function getNextCardId(card) {
  // return cardId of previous card
  let index = cards.indexOf(card)
  index++
  while ((index >= cards.length) || (cards[index].type == 'category-description')) {
    index >= cards.length ? index = 0 : index++
  }
  return cards[index].id
}


module.exports = {
    'all' : function (req, res, next) {
        req.cards = cards
        next()
    },

    'shuffledList' : function (req, res, next) {
        // make a true copy of the array so the order of the
        // cards stays te same
        req.cards = cards.slice()
        // shuffle the array randomly
        shuffle(req.cards)
        next()
    },

    'categoryList' : function(req, res, next, category) {
        // filter cards on category
        req.cards = cards.filter(function(card) {
            return card.strategy == category
        })
        // also look up category information
        req.category = req.cards[0]
        console.log(req.cards[0])
        next()
    },

    'get' : function(req, res, next, cardId) {
        // find card using cardId
        req.card = cards.find(function(card) {
            return cardId == card.id
        })
        // also look up category information
        req.category = cards.filter(function(card) {
            return card.strategy == req.card.strategy
        })[0]
        // also give a reference to the previous and next card
        let index = cards.indexOf(req.card)
        req.previousCard = getPreviousCardId(req.card)
        req.nextCard = getNextCardId(req.card)
        next()
    }
}