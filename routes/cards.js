const express = require('express')
const router = express.Router()
const cards = require('../models/cards')
const config = require('../config/config.json')

/* ***************************************************** */
/*         -------------- MIDDLEWARE --------------      */
/* ***************************************************** */
// get all cards in category, if url contains category
router.param('category',cards.categoryList)
// get the card with cardId, if url contains cardId
router.param('cardId', cards.get)

/* ***************************************************** */
/*          -------------- ROUTING --------------        */
/* ***************************************************** */

/*        FOR ROUTES THAT CONTAIN ONLY A CATEGORY        */
router.get('/:category', function(req, res){
    console.log("--CATEGORY-- " + req.params.category)
    // check if category exists
    if (config.categories.find(function(element) { return element == req.params.category})) {
        // render page to show all cards in category
        res.render('category', {categories: config.categories,
                                categoryDescr: req.categoryDescr,
                                cards: req.cards})
    // if category doesn't exist, show error
    } else {
        var err = {status: '404', stack: ""}
        res.render('error', {error: err,
                              message: "Sorry, can't find this category...",
                              categories: config.categories})
    }
})

/*        FOR ROUTES THAT CONTAIN BOTH A CATEGORY AND CARD_ID       */
router.get('/:category/:cardId', function(req, res){
    console.log("--DETAIL-- " + req.params.category + '/' + req.params.cardId)
    // check if card exists
    if (req.card) {
      res.render('card-detail', { categories: config.categories,
                                  categoryDescr: req.categoryDescr,
                                  card: req.card,
                                  previousCard: req.previousCard,
                                  nextCard: req.nextCard})
    // if no card with that id exists, show error
    } else {
      var err = {status: '404', stack: ""}
      res.render('error', {error: err,
                            message: "Sorry, can't find this card...",
                            categories: config.categories})

    }
})


module.exports = router;
