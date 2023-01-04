const express = require('express')

const { protectRoute } = require('../middleware/auth')
const { getUsers, register, login, getCurrentUser } = require('../controllers/auth')

const router = express.Router()

router.get('/users', getUsers)
router.get('/me', protectRoute, getCurrentUser)
router.post('/login', login)
router.post('/register', register)

module.exports = router