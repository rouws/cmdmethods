const express = require('express')
const router = express.Router()
const cards = require('../models/cards')
const config = require('../config/config.json')

/* ***************************************************** */
/*         -------------- MIDDLEWARE --------------      */
/* ***************************************************** */
// get all cards, clien-side code will determine which cards to show or not
router.use('/', cards.all)

/* ***************************************************** */
/*          -------------- ROUTING --------------        */
/* ***************************************************** */

/*        FOR ROUTES THAT CONTAIN ONLY A CATEGORY        */
router.get('/', function(req, res){
    console.log("--FAVORITES--")
    res.render('favorites', { categories: config.categories,
                              categoryDescr: config.home,
                              cards: req.cards })
})


module.exports = router;
