const Job = require('../models/Jobs')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError,  NotFoundError } = require('../errors')

const createJob = async (req, res) => {
    //console.log(req.user)// assigning the user proerties to req object in authentication middleware
    req.body.createdBy = req.user.userId
    console.log(req.body)
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json(job)
}

const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req

    const job = await Job.findOne({ _id: jobId, createdBy: userId })

    if (!job) {
        throw new NotFounderror(`No job exists with this id: ${jobId}`)
    }
    res.status(StatusCodes.OK).json(job)
}

const getAllJobs = async (req, res) => {
    
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}


const deleteJob = async (req, res) => {
    const { user: { userId },
    params: { id: jobId } } = req
    const job = await Job.findByIdAndDelete({
        _id: jobId, createdBy: userId,
    })
    console.log(job)
    if (!job) {
        throw new NotFoundError(`No job exists with this id: ${jobId}`)
    }
    res.status(StatusCodes.OK).send('Deleted')
}

const updateJob = async (req, res) => {

    const { body: { company, position },
        user: { userId },
        params: { id: jobId } } = req

        console.log(req.params, req.body, req.user)

    if(company === '' || position===''){
            throw new BadRequestError('Company and Position cannot be empty')
    }

    const job = await Job.findOneAndUpdate( {_id:jobId, createdBy:userId}, req.body, {new:true, runValidators:true} )
    console.log(job)
    if(!job) {
        console.log('not found')
        throw new NotFoundError(`No job exists with this id: ${jobId}`)
    }
        
    res.status(StatusCodes.OK).json({job})
}

module.exports = { createJob, getJob, getAllJobs, deleteJob, updateJob }