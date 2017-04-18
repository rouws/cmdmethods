const express = require('express')
const jf = require('jsonfile')

const categoryRouter = express.Router()
var cards = {}

// read content of cards from json file
jf.readFile('./public/json/content.json', function(err, obj) {
  console.log("./public/json/content.json loaded")
  cards = obj
});


categoryRouter.get('/:category', function (req, res) {
    console.log('categoryRouter working')
//    res.render('category', { category: req.params.category, cards: cards })
})

module.exports = categoryRouter;

