require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const connectDB = require('./db')

// routes
const AnimeRoute = require('./routes/animes')
const Auth = require('./routes/auth')

// body parser
app.use(express.json())

// Cookie parser
app.use(cookieParser())

app.use('/api/v1', AnimeRoute)
app.use('/api/v1/auth', Auth)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)

    // db connect
    connectDB()
})

