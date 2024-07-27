const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt  = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Please provide name'],
        minLength: 3,
        maxLength: 50,
    },
    email:{
        type: String,
        required:[true, 'Please provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
        unique: true, //it creates a unique index and not a validator
    },
    password:{
        type: String,
        required:[true, 'Please provide password'],
        minLength: 6,
    },

})

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt) //here 'this' will always point to the current User.js document that is being created but this works only with function statements
    //next() this can be omitted as part of mongoose 5.0+ version

})

// UserSchema.methods.getName = function() {
//     return this.name;
// }

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId: this._id, name: this.name},process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}
module.exports= mongoose.model("User",UserSchema)