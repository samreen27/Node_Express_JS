const express = require('express')
const app = express()
const path = require('path')
const urlModel = require('./models/url')
require('dotenv').config()

const urlRouter = require('./routes/url')
const staticRouter = require('./routes/staticRouter')
const connectDB = require('./connectDB/connectDB.js')


const PORT = 3000


app.set("view engine", 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/url', urlRouter)
app.use('/', staticRouter)



const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(PORT, () => console.log(`Server started at Port ${PORT}..`))

    } catch (error) {
        console.log(error)
    }
}
start()