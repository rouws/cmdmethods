const express = require('express')
const app = express()

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
   res.send('Sorry, this is an invalid URL.');
});


// start server on port 3000
app.listen(3000, function () {
  console.log('=================================Server started on port 3000')
})
