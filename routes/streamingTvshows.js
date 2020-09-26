var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
let streamingTvShow = require('../models/StreamingTvshows.js');
let StreamingTvShow = mongoose.model('StreamingTvshow');



router.get('/', function(req, res){
    res.render('StreamingTvShow/streamingTvshow');
  });
  
  router.get('/create', function(req, res){
    res.render('StreamingTvShow/createStreamingTvshow');
  });

  router.post('/create', function(req, res){

    var streamingTvShow = new StreamingTvShow({
      title: req.body.title,
      genre: req.body.genre,
      description: req.body.description,
      cast: req.body.cast,
      duration: req.body.duration,
      releaseDate: req.body.releaseDate,
      popcornRating: req.body.popcornRating,
      rating: req.body.rating,
      director: req.body.director,
      writers: req.body.writers,
      seasons: req.body.seasons
    });
  

    
    streamingTvShow = streamingTvShow.save(function(err) {
      if(err) {
        console.log(err)
        return
      } else {
          res.redirect('/');
        }
      });
    });


module.exports = router;