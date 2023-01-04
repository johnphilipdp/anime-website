const express = require('express')
const router = express.Router()

// Middleware
const { protectRoute } = require('../middleware/auth')

// route controllers
const {
    createAnime,
    getAnimes,
    getAnime,
    updateAnime,
    deleteAnime
} = require('../controllers/animes')

router.route('/animes')
    .post(protectRoute,createAnime)
    .get(getAnimes)

router.route('/animes/:id')
    .get(getAnime)
    .put(protectRoute, updateAnime)
    .delete(protectRoute, deleteAnime)


module.exports = router