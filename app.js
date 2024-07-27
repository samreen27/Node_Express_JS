const express = require('express')
const app = express()
require('express-async-errors');
require('dotenv').config()
const connectDB = require('./JOBS/db/dbConnect')
const notFoundMiddleware  = require('./JOBS/middleware/not-found')
const authRouter = require('./JOBS/routes/authRouter')
const jobsRouter = require('./JOBS/routes/jobs')
const errorHandlerMiddleware  = require('./JOBS/middleware/error-handler')
const authenticateUser = require('./JOBS/middleware/authentication')


port = process.env.PORT || 3000

app.use(express.json())


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