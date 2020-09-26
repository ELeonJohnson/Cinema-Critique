var mongoose = require('mongoose');

var tvShowSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true, default: ""},
    genre: {type: String, required: true, trim: true, default: ""},
    description: {type: String, required: true, trim: true, default: ""},
    cast: {type: String, required: true, trim: true, default: ""},
    duration: {type: String, trim: true, default: ""},
    releaseDate: {type: String, trim: true, default: ""},
    popcornRating: {type: Number, required: true},
    rating:{type: String, required: true, trim: true, default: ""},
    director: {type: String, required:true, trim: true, default: ""},
    writers: {type: String, required: true, trim: true, default: ""},
    seasons: {type: Number, required: true}
});

var TvShow = mongoose.model('TvShow', tvShowSchema);
exports.tvShowSchema = tvShowSchema;
exports.TvShow = TvShow;