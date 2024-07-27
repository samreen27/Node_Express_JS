const express = require('express')
const app = express()

require('express-async-errors');
require('dotenv').config()
const connectDB = require('./JOBS/db/dbConnect')
const notFoundMiddleware  = require('./JOBS/middleware/not-found')

//routers
const authRouter = require('./JOBS/routes/authRouter')
const jobsRouter = require('./JOBS/routes/jobs')

//error handling with middleware
const errorHandlerMiddleware  = require('./JOBS/middleware/error-handler')
const authenticateUser = require('./JOBS/middleware/authentication')

//extra security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')


port = process.env.PORT || 3000


app.set('trust proxy', 1); //we need to set proxy if our app is behind reverse proxy
app.use(rateLimiter({
  windowMs: 15 * 60 * 1000, //15minutes
  max: 100, // limit wach IP to 100 requests per indowMs
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

//routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authenticateUser, jobsRouter)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const start = async () => {
 try {
  await connectDB(process.env.MONGODB_URI)
  app.listen(port, () =>
    console.log(`Server is listening on port ${port}...`)
  );
 } catch (error) {
  console.log(error)
 }
}

start()