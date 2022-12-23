const express = require('express')
const router = express.Router()

// route controllers
const {
    createAnime,
    getAnimes,
    getAnime,
    updateAnime,
    deleteAnime
} = require('../controllers/animes')

router.route('/animes')
    .post(createAnime)
    .get(getAnimes)
    
router.route('/animes/:id')
    .get(getAnime)
    .put(updateAnime)
    .delete(deleteAnime)


module.exports = router