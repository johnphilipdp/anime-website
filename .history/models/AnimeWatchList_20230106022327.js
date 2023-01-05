const mongoose = require('mongoose')

const { Schema } = mongoose


const animeWatchListSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    anime: {
        type: mongoose.Types.ObjectId,
        ref: 'Anime',
        required: true
    }
})


module.exports = mongoose.model('AnimeWatchList', animeWatchListSchema)