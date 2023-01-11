const express = require('express')
const router = express.Router()
const path = require('path')

const multer = require('multer')
const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, process.env.FILE_UPLOAD_PATH)
    },
    filename: (req, file, cb) => {
        if (!file.mimetype.startsWith('image')) {
            return res.status(400).json({
                success: false,
                message: 'Image file type is invalid'
            })
        }
        cb(null,
            `anime_${Date.now() + path.parse(file.originalname).ext}`)
    }
})

const upload = multer({ storage, limits: { fileSize: process.env.FILE_SIZE_LIMIT } })


// Middleware
const { protectRoute, authorize } = require('../middleware/auth')

// route controllers
const {
    createAnime,
    getAnimes,
    getAnime,
    updateAnime,
    deleteAnime
} = require('../controllers/animes')

router.route('/animes')
    .post(protectRoute, upload.single('image'), createAnime)
    .get(getAnimes)


router.route('/animes/:id')
    .get(getAnime)
    .put(protectRoute, authorize('admin'), updateAnime)
    .delete(protectRoute, authorize('admin'), deleteAnime)



module.exports = router