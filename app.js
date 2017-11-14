const express = require('express')
const app = express()

// router
const router = require('./routes/site')

// view engine setup
app.set('view engine', 'pug')
// tell express to use static files in dir 'public'
app.use(express.static('public'))
//Tell app which routers to use when certain pages are opened
app.use('/', router)
// if page cannot be found, render the 404 error page
app.get('/*', function(req,res){
    var err = new Error('Not Found')
    err.status = 404
    res.render('error', { error: err})
});
// 
// start server on port 3000
app.listen(3000, function () {
  console.log('=================================Server started on port 3000')
})
