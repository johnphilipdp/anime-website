const mongoose = require('mongoose')

mongoose.set("strictQuery", false)

const connectDB = async () => {
    try {
        console.log('connecting mongodb...')
        const con = await mongoose.connect(process.env.MONGO_URI)
        if(con) {
            console.log('Succesfully connected to mongodb...')
        }

    } catch (error) {
        handleError(error)
    }
}

module.exports = connectDB