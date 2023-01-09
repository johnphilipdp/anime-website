require('dotenv').config()
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const connectDB = require('./db')
// security
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')

// routes
const AnimeRoute = require('./routes/animes')
const User = require('./routes/user')

// body parser
app.use(express.json())

//sanitize data
app.use(mongoSanitize())

// set security headers
app.use(helmet())

// Cookie parser
app.use(cookieParser())

// prevent script injection
app.use(xss())

// rate limit
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 min
    max: 100
})

app.use(limiter)

// prevent http param pollution
app.use(hpp())

// enable cors
app.use(cors())

app.use('/api/v1', AnimeRoute)
app.use('/api/v1/user', User)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)

    // db connect
    connectDB()
})

