const express = require('express')
const app = express()
require('dotenv').config()

const urlRouter = require('./routes/url')
const connectDB = require('./connectDB/connectDB.js')


const PORT = 3000

app.use(express.json())
app.use('/url', urlRouter)


const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(PORT, () => console.log(`Server started at Port ${PORT}..`))

    } catch (error) {
        console.log(error)
    }
}
start()