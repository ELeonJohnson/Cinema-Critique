var express = require('express');
var router = express.Router();
let streamingMovie = require('../models/streamingMovies.js');
var mongoose = require('mongoose');
let StreamingMovie = mongoose.model('StreamingMovie');

router.get('/', function(req, res){
    res.render('StreamingMovie/streamingMovie');
  });
  
  router.get('/create', function(req, res){
    res.render('StreamingMovie/createStreamingMovie');
  });

  router.post('/create', function(req, res){

    var streamingMovie = new StreamingMovie({
      title: req.body.title,
      genre: req.body.genre,
      description: req.body.description,
      cast: req.body.cast,
      duration: req.body.duration,
      releaseDate: req.body.releaseDate,
      popcornRating: req.body.popcornRating,
      rating: req.body.rating,
      director: req.body.director,
      writers: req.body.writers
    });
    
    
    streamingMovie = streamingMovie.save(function(err) {
      if(err) {
        console.log(err)
        return
      } else {
          res.redirect('/');
        }
      });
    });


module.exports = router;