require('dotenv').config()
require('express-async-errors')
const notFoundMiddleware = require('./STORE_API/middleware/not-found');
const errorMiddleware = require('./STORE_API//middleware/error-handler');
const connectDB = require('./STORE_API/db/dbConnect')
const productsRouter = require('./STORE_API/routes/products')

const express = require('express')
const app = express()

port = process.env.PORT || 5000

//middleware
app.use(express.json())

//routes
app.get("/",(req,res)=>{
    res.send('<h1>StoreAPI </h1><a href="/api/v1/products">Products Route</a>')
})

app.use('/api/v1/products',productsRouter)

//Products Route
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const start = async() =>{
    try{

        await connectDB(process.env.MONGODB_URI)
        //app.listen(port, console.log(`server is listening on port ${port}...`))

    } catch(error){
        console.log(error) 
    }
}

start()