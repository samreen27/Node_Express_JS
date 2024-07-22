
//require('./Task_Manager/db/connect.js') // this will directly execute mongoose.connect() in connect.js
const express = require('express')
const app = express()
const tasks = require('./Task_Manager/routes/tasks.js')
const connectDB = require('./Task_Manager/db/connect.js')
const notFound = require('./Task_Manager/middleware/not-found.js')
const errorHandlerMiddleware = require('./Task_Manager/middleware/error-handler.js')
require('dotenv').config()
port = process.env.PORT || 3000

//middleware
app.use(express.static('./Task_Manager/public'))

app.use(express.json())

app.use('/api/v1/tasks', tasks)

app.use(notFound)

app.use(errorHandlerMiddleware)

const start = async ()=> {
    try {
        await connectDB(process.env.MONGODB_URI)
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)        
    }
}
start()