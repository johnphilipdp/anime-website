const express = require('express')

const { protectRoute } = require('../middleware/auth')
const {
    getUsers,
    getUser,
    addAnimeToList,
    getUserWatchList,
    removeAnimeFromList
} = require('../controllers/users')

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.get('/:id/watch-list', protectRoute, getUserWatchList)

router
    .route('/:id/watch-list/:animeID')
    .post(protectRoute, addAnimeToList)
    .delete(protectRoute, removeAnimeFromList)


module.exports = router