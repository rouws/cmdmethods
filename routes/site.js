const express = require('express')
const carddata = require('../carddata')

const router = express.Router()

// get the carddata to be displayed
router.use('/', carddata.shuffledList)
router.use('/:category', carddata.list)
router.use('/:category/:cardId', carddata.get)


// routes
router.get('/', function (req, res) {
    res.render('index', { cards: req.cards })
})
router.get('/:category', function (req, res) {
    res.render('category', {category: req.params.category, cards: req.cards})
})
router.get('/:category/:cardId', function (req, res) {
    res.render('card-detail', { card: req.card})
})

module.exports = router;