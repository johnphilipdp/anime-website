const express = require('express')
const router = express.Router()

// Middleware
const { protectRoute, authorize } = require('../middleware/auth')

// route controllers
const {
    createAnime,
    getAnimes,
    getUserAnimes,
    getAnime,
    updateAnime,
    deleteAnime
} = require('../controllers/animes')

router.route('/animes')
    .post(protectRoute, createAnime)
    .get(getAnimes)


router.route('/animes/:id')
    .get(getAnime)
    .put(protectRoute, authorize('admin'), updateAnime)
    .delete(protectRoute, authorize('admin'), deleteAnime)


// GET User animes
router.route('/user/:userId/animes')
    .get(protectRoute, getUserAnimes)


module.exports = router