const express = require('express')
const router = express.Router()


const { protectRoute } = require('../middleware/auth')


const { addAnimeToWatchList } = require('../controllers/animeWatchList')

// Post to user Id watch list
router.route('/:userId/animes')
    .post(protectRoute, addAnimeToWatchList)


module.exports = router