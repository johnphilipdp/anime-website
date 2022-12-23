const mongoose = require('mongoose')
const slug = require('slug')

const { Schema } = mongoose;

const animeSchema = new Schema({
    title: String,
    producer: String,
    body: String,
    comments: [
        {
            body: String,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: { type: Date, default: Date.now },
    meta: {
        votes: Number,
        favs: Number
    },
    slug: String
})

animeSchema.pre("validate", function(next) {
    this.slug = slug(this.title)
    console.log(this.slug)
    next()
})

const Anime = mongoose.model('Anime', animeSchema)

module.exports = Anime