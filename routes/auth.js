const express = require('express')

const {
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
} = require('../controllers/auth')

const router = express.Router()


router.post('/login', login)
router.get('/logout', logout)
router.post('/register', register)
router.post('/forgot', forgotPassword)
router.put('/:token/reset', resetPassword)


module.exports = router