const mongoose = require('mongoose')
const slug = require('slug')

const { Schema } = mongoose;

const animeSchema = new Schema({
    title: String,
    producer: String,
    description: String,
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
    user: {
        type: Array,
        ref: 'User',
        required: true
    },
    slug: String
})

animeSchema.pre("validate", function(next) {
    this.slug = slug(this.title)
    console.log(this.slug)
    next()
})

module.exports = mongoose.model('Anime', animeSchema)