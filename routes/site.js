const express = require('express')
const carddata = require('../carddata')
const router = express.Router()
const categories = ["library","field","lab","showroom","workshop","stepping-stones"]
const home = {"strategy" : "home"}

// get the carddata to be displayed
router.use('/', carddata.shuffledList)
router.use('/favorites', carddata.all)
router.param('category', carddata.categoryList)
router.param('cardId', carddata.get)


// routes
router.get('/', function (req, res) {
    res.render('index', { categories: categories,
                          category: home,
                          cards: req.cards })
})

router.get('/favorites', function (req, res) {
    res.render('favorites', { categories: categories,
                              category: home,
                              cards: req.cards })
})

router.get('/:category', function (req, res) {
    res.render('category', {categories: categories,
                            category: req.category,
                            cards: req.cards})
})
router.get('/cards/:cardId', function (req, res) {
    res.render('card-detail', { categories: categories,
                                category: req.category,
                                card: req.card,
                                previousCard: req.previousCard,
                                nextCard: req.nextCard})
})

module.exports = router;
