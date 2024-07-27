const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async(req,res, next)=>{

    const user = await User.create({...req.body})
    // const {name, email, password} = req.body
    // if(!name || !email || !password){
    //     throw new BadRequestError('Please provide name')
    // }


    //const token = jwt.sign({userID: user._id, name: user.name},process.env.JWT_SECRET, {expiresIn: '30d'})
    const token = user.createJWT()

    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })

}
const login = async(req,res)=>{
    const {email,password} = req.body
    console.log(req.body)
    if(!email || !password){
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({email})
    console.log("user",user)
    //comapre password
    if(!user){
        console.log("throw unauthenticated")
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect){
        console.log("throw unauthenticated")
        throw new UnauthenticatedError('Invalid Credentials')
    }
   
    const token = user.createJWT()



    res.status(StatusCodes.OK).json({user:{name: user.name}, token})
}

module.exports ={ register, login }   

