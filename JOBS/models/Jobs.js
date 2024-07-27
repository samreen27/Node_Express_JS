const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxLength: 50
    },
    position: {
        type: String,
        required: [true, 'Please provide company position'],
        maxLength: 50
    },
    status: {
        type: String,
        required: [true, 'Please provide company status'],
        enum: ['interview','declined', 'pending'],
        default: 'pending'
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'Please provide an user']
    }
}, {timestamps:true})

module.exports = mongoose.model('Job',JobSchema)