const mongoose = require('mongoose')
const slug = require('slug')

const { Schema } = mongoose;

const animeSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Anime title is required.'],
        unique: [true, 'Anime title already exist.']
    },
    description: {
        type: String,
        required: [true, 'Anime description is required.']
    },
    producer: String,
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
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
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    slug: String
})

animeSchema.pre("validate", function(next) {
    if(this.title) {
        this.slug = slug(this.title)
    }
    next()
})

module.exports = mongoose.model('Anime', animeSchema)