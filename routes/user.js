const express = require('express')

const { protectRoute } = require('../middleware/auth')
const { getUsers, register, login, getCurrentUser, addAnimeToList, getUserWatchList, removeAnimeFromList } = require('../controllers/user')

const router = express.Router()

router.get('/users', getUsers)
router.get('/users/:userId/lists', protectRoute, getUserWatchList)
router.route('/users/:userId/lists/:animeId')
    .post(protectRoute, addAnimeToList)
    .delete(protectRoute, removeAnimeFromList)

router.get('/me', protectRoute, getCurrentUser)
router.post('/login', login)
router.post('/register', register)

module.exports = router