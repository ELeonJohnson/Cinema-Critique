const mongoose = require("mongoose");

const AnimationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        default: ""
    },
    genre: {
        type: String,
        required: true,
        trim: true,
        default: ""
    },
    releaseDate: {
        type: String,
        required: true,
        trim: true,
        default: ""
    },
    country: {
        type: String,
        required: true,
        trim: true,
        default: ""
    },
    duration: {
        type: String,
        required: true,
        trim: true,
        default: ""
    },
    popcornRating: {
        type: Number,
        requried: true,
        default: 0
    },
    description: {
        type: String,
        required: true,
        trim: true,
        default: ""
    },
    creator: {
        type: String,
        required: true,
        trim: true,
        default: ""
    },
    cast: {
        type: String,
        required: true,
        trim: true,
        default: ""
    },
    episodes: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model("Animation", AnimationSchema);