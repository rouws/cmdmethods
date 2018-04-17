const shuffle = require('shuffle-array')

/* *********************************************************

The card data should be available in req.app.cardData

*********************************************************** */


function getPreviousCard(cards, card) {
  // return cardId of previous card
  let index = cards.indexOf(card)
  index--
  while ((index < 0) || (cards[index].type == 'category-description')) {
    index < 0 ? index = cards.length-1 : index--
  }
  return cards[index]
}

function getNextCard(cards, card) {
  // return cardId of previous card
  let index = cards.indexOf(card)
  index++
  while ((index >= cards.length) || (cards[index].type == 'category-description')) {
    index >= cards.length ? index = 0 : index++
  }
  return cards[index]
}


module.exports = {
    /* *********************************************************

    GET ALL CARDS AND SAVE THEM IN req.cards

    *********************************************************** */
    'all' : function (req, res, next) {
        req.cards = req.app.cardData
        next()
    },

    /* *********************************************************

    GET A SHUFFLED LIST OF ALL CARDS AND SAVE THEM IN req.cards

    *********************************************************** */
    'shuffledList' : function (req, res, next) {
        // make a true copy of the array so the order of the
        // cards stays te same
        req.cards = req.app.cardData.slice()
        // shuffle the array randomly
        shuffle(req.cards)
        next()
    },

    /* *********************************************************

    GET ALL CARDS BELONGING TO A CATEGORY AND SAVE THEM IN req.cards
    ALSO SAVE THE CATEGORY DESCRIPTION IN req.categoryDescr

    *********************************************************** */
    'categoryList' : function(req, res, next, category) {
        // filter cards on category
        req.cards = req.app.cardData.filter(function(card) {
            return card.strategy == category
        })
        // also look up category information
        req.categoryDescr = req.cards[0]
        next()
    },

    /* *********************************************************

    GET ONE CARD WITH cardId AND SAVE IT TO req.card
    ALSO SAVE A REFERENCE TO THE PREVIOUS AND NEXT CARD IN THE LIST

    *********************************************************** */
    'get' : function(req, res, next, cardId) {
        // find card using cardId
        req.card = req.app.cardData.find(function(card) {
            return cardId == card.id
        })
        if (req.card) {
          // also look up category information
          req.categoryDescr = req.app.cardData.filter(function(card) {
              return card.strategy == req.card.strategy
          })[0]
          // also give a reference to the previous and next card
          let index = req.app.cardData.indexOf(req.card)
          req.previousCard = getPreviousCard(req.app.cardData, req.card)
          req.nextCard = getNextCard(req.app.cardData, req.card)
        }
        next()
    }
}
