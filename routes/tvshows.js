var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
let tvshow = require('../models/Tvshows.js');
let TvShow = mongoose.model('TvShow');



router.get('/', function(req, res){
    res.render('TvShow/tvshow');
  });
  
  router.get('/create', function(req, res){
    res.render('TvShow/createTvShow');
  });

  router.post('/create', function(req, res){

    var tvShow = new TvShow({
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

    
    tvShow = tvShow.save(function(err) {
      if(err) {
        console.log(err)
        return
      } else {
          res.redirect('/');
        }
      });
    });


module.exports = router;