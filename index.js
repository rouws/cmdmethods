const express = require('express')
const app = express()
const config = require('./config/config.json')
const jf = require('jsonfile')

// routers
const home  = require('./routes/home')
const cards = require('./routes/cards')
const favorites = require('./routes/favorites')

// view engine setup
app.set('view engine', 'pug')
app.set('views', './views')

// tell express to use static files in dir 'public'
app.use(express.static('public'))
// Tell app which routers to use when certain pages are opened
app.use('/', home)
app.use('/favorites', favorites)
app.use('/cards', cards)
// else page not found
app.get('*', function(req, res){
  var err = {status: '404', stack: ""}
  res.render('error', {error: err,
                        message: "Sorry, can't find this page...",
                        categories: config.categories})
})


// read content of cards from json file
jf.readFile(config.jsonfile, function(err, obj) {
  if (err) throw err
  // save carddata in app, so it is available globally
  app.cardData = obj

  // start server on port 5000
  app.listen(5000, function () {
    console.log('================= Server started on port 5000 ================')
  })

})
