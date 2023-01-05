const express = require('express')
const router = express.Router()


const { protectRoute } = require('../middleware/auth')


const { addAnimeToWatchList, getAnimeWatchLists } = require('../controllers/animeWatchList')

// Post to user Id watch list
router.route('/animes')
    .post(protectRoute, addAnimeToWatchList)
    .get(protectRoute, getAnimeWatchLists)


module.exports = router