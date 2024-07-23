require('dotenv').config()

const connectDB = require('./db/dbConnect')
const Product = require('./model/modelProducts')

const jsonProducts = require('./products.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI)
     await Product.deleteMany()
     await Product.create(jsonProducts)
    console.log('Success!!!!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()