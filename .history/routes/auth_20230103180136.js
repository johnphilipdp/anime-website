const express = require('express')

const { getUsers, register, login } = require('../controllers/auth')

const router = express.Router()

router.get('/users', getUsers)
router.post('/login', login)
router.post('/register', register)

module.exports = router