const express = require('express');
const router = express.Router();
let Animation = require("../models/Animations");



  
  router.get('/create', function(req, res){
    res.render('Animation/createAnimation');
  });

  router.post('/create', function(req, res){
    
    let animation = new Animation({
      title: req.body.title,
      genre: req.body.genre,
      description: req.body.description,
      cast: req.body.cast,
      duration: req.body.duration,
      releaseDate: req.body.releaseDate,
      popcornRating: req.body.popcornRating,
      creator: req.body.creator,
      country: req.body.country,
      episodes: req.body.episodes
    });

    
    animation.save(function(err) {
      if(err) {
        console.log(err)
        return
      } else {
          res.redirect('/');
        }
      });
    });

  
router.get('/', function(req, res){  
  Animation.find({}, function(err, animation) {
    if(err) {
      console.log(err)
    } else {
      res.render('Animation/animation.ejs', 
      {
        animation: animation
      });
      console.log(animation);
    }
  });  
});


module.exports = router;