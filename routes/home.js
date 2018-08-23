const express = require('express')
const router = express.Router()
const cards = require('../models/cards')
const config = require('../config/config.json')

// get a shuffled list of cards
router.use('/', cards.all)


router.get('/', function (req, res) {
    console.log("--HOME--")
    // render home view
    res.render('home', { categories: config.categories,
                          category: 'home',
                          homeDescr: config.home,
                          cards: req.cards })
})


module.exports = router;
