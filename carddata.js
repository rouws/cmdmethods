const express = require('express')
const shuffle = require('shuffle-array') 
const jf = require('jsonfile')


var cards = []

// read content of cards from json file
jf.readFile('./public/json/content.json', function(err, obj) {
  console.log("./public/json/content.json loaded")
  cards = obj
});

var carddata = {
    
    'shuffledList' : function (req, res, next) {
        req.cards = cards
        shuffle(req.cards)
        next()
    },
    
    'list' : function(req, res, next) {
        if(req.params.category) {
            req.cards = cards.filter(function(card) {
                return card.strategy == req.params.category
            })
        }
        next()
    },
    
    'get' : function(req, res, next) {
        if (req.params.cardId) {
            req.card = cards.find(function(card) {
                return req.params.cardId == card.id
            })
            console.log(req.card)
        }
        next()
    }
}

module.exports = carddata;

