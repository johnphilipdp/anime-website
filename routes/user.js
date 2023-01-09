const express = require('express')

const { protectRoute } = require('../middleware/auth')
const { getUsers, register, login, getCurrentUser, addAnimeToList, getUserWatchList, removeAnimeFromList, forgotPassword, resetPassword, logout } = require('../controllers/user')

const router = express.Router()

router.get('/', protectRoute, getUsers)
router.get('/lists', protectRoute, getUserWatchList)
router.route('/:userId/lists/:animeId')
    .post(protectRoute, addAnimeToList)
    .delete(protectRoute, removeAnimeFromList)

// @TODO: move to another route file named auth
router.get('/me', protectRoute, getCurrentUser)
router.post('/login', login)
router.get('/logout', logout)
router.post('/register', register)
router.post('/forgot', forgotPassword)
router.put('/:token/reset', resetPassword)

module.exports = router