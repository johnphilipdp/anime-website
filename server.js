require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const connectDB = require('./db')
const errorHandler = require('./middleware/errorHandler')
// security
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// routes
const AnimeRoute = require('./routes/animes')
const UsersRoute = require('./routes/users')
const AuthRoute = require('./routes/auth')

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

app.use(express.static(path.join(__dirname, '/public')))

app.use('/api/v1/auth', AuthRoute)
app.use('/api/v1/users', UsersRoute)
app.use('/api/v1/animes', AnimeRoute)

app.use(errorHandler)

const PORT = process.env.PORT || 8000

const server = app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)

    // db connect
    connectDB()
})

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`)

    server.close(() => process.exit(1))
})
console.log('hello');
