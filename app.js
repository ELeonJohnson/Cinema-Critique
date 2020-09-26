const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
var expressValidator = require('express-validator');

const app = express();

//DB Config
const db = require("./config/keys").MongoURI;

//Connect To Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDb Connected..."))
    .catch(err => console.log(err));   

//EJS 
app.use(expressLayouts)
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");


app.use(expressValidator());
//body-parser middleare
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }))
// create application/json parser
app.use(bodyParser.json());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(flash());


//Passport Config
require("./config/passport")(passport);
  //Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());



//Express Session Middleware
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
  );


  //Global Vars
  app.use(function (req, res, next){
      res.locals.succes_msg = req.flash("success_msg")
      res.locals.error_msg = req.flash("error_msg")
      res.locals.error = req.flash("error")
      next();
  });

//Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/movies", require("./routes/movies"));
app.use("/tvshows", require("./routes/tvshows"));
app.use("/animations", require("./routes/animations"));
app.use("/streamingMovies", require("./routes/streamingMovies"));
app.use("/streamingTvshows", require("./routes/streamingTvshows"));







const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server Started On Port: ${PORT}`));