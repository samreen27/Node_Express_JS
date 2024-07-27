require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

//const connectDB = require('./JWT/db/dbConnect.js')

const mainRouter = require('./JWT/routes/router.js')
const notFoundMiddleware = require('./JWT/middleware/not-found.js')
const errorHandlerMiddleware = require('./JWT/middleware/error-handler.js')



port = 3000

app.use(express.static('./JWT/public'))
app.use(express.json())


app.use('/api/v1',mainRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)



const start = async () => {
    try {
        //await connectDB(process.env.MONGODB_URI)
        app.listen(port, console.log(`server is listening on port ${port}...in jwt`))
    } catch (error) {
        console.log(error)
    }
}

start()