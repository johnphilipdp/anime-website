require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./db')

// routes
const AnimeRoute = require('./routes/animes')

// body parser
app.use(express.json())

app.use('/api/v1', AnimeRoute)


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
    
    // db connect
    connectDB()
})

