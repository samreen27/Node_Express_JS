const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {

  let customError = {
    //set defaults
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, Try again later',
  }

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  //if there is no password/email/name , multiple fields not provided
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
    customError.statusCode = 400
  }

  //if the mail already exists in the db
  if(err.code && err.code === 11000){
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, Please choose another value`
    customError.statusCode = 400
  }

  //cast error, when the user provides wrong Id or a id that is not present in db
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value}`
    customError.statusCode = 404
  }

 


  // return res
  //   .status(customError.statusCode)
  //   .json({err})
  return res
    .status(customError.statusCode)
    .json({msg: customError.msg})
}

module.exports = errorHandlerMiddleware