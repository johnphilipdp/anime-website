const express = require('express')

const { protectRoute } = require('../middleware/auth')
const { getUsers, register, login, getCurrentUser, addAnimeToList, getUserWatchList, removeAnimeFromList } = require('../controllers/user')

const router = express.Router()

router.get('/', getUsers)
router.get('/:userId/lists', protectRoute, getUserWatchList)
router.route('/:userId/lists/:animeId')
    .post(protectRoute, addAnimeToList)
    .delete(protectRoute, removeAnimeFromList)

// @TODO: move to another route file named auth
router.get('/me', protectRoute, getCurrentUser)
router.post('/login', login)
router.post('/register', register)

module.exports = router