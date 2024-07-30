const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const urlRouter = require('./routes/url')
const staticRouter = require('./routes/staticRouter')
const userRouter = require('./routes/user.js')

const connectDB = require('./connectDB/connectDB.js')
const urlModel = require('./models/url')
const {restrictToLoggedInUserOnly,checkAuth} = require('./middleware/auth.js')

const PORT = 3000


app.set("view engine", 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())


app.use('/url',restrictToLoggedInUserOnly, urlRouter)
app.use('/',checkAuth, staticRouter)
app.use('/user',  userRouter)



const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(PORT, () => console.log(`Server started at Port ${PORT}..`))

    } catch (error) {
        console.log(error)
    }
}
start()