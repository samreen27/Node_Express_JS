const express = require('express')
const urlModel = require('../models/url')
const router = express.Router()

router.get('/', async (req,res)=>{
    const allUrls = await urlModel.find({})
    res.render('home', {urls: allUrls})
})

module.exports = router