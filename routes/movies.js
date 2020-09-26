var express = require('express');
var router = express.Router();
let movie = require('../models/Movies.js');
var mongoose = require('mongoose');
let Movie = mongoose.model('Movie');





router.get('/', function(req, res){
  res.render('Movie/movie');
});

router.get('/create', function(req, res){
  res.render('Movie/createMovie');
});

router.post('/create', function(req, res){

var movie = new Movie({
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
  budget: req.body.budget,
  boxOffice: req.body.boxOffice
});


movie = movie.save(function(err) {
  if(err) {
    console.log(err)
    return
  } else {
      res.redirect('/');
    }
  });
});

  module.exports = router;