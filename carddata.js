var express = require('express')
const jf = require('jsonfile')

var cards = {}

// read content of cards from json file
jf.readFile('./public/json/content.json', function(err, obj) {
  console.log("./public/json/content.json loaded")
  cards = obj
});

function getCards(req, res, next) {
    console.log('getCardsOrdered')
    req.cards = cards
    next()
}

module.exports = getCards;