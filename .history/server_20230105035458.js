require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./db')

// routes
const AnimeRoute = require('./routes/animes')
const Auth = require('./routes/auth')

// body parser
app.use(express.json())

app.use('/api/v1', AnimeRoute)
app.use('/api/v1/auth', Auth)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)

    // db connect
    connectDB()
})

