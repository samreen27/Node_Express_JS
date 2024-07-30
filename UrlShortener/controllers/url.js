const shortid= require('shortid')
const urlModel = require('../models/url')

async function handleGenerateShortURL(req,res) {
    const {url} = req.body
    console.log(url)
    const shortID = shortid(8)

    if(!url){
        return res.status(400).json({error: `URL is required`})
    }

    await urlModel.create({shortId: shortID,
                            redirectURL: url,
                            visitHistory : [],
                            createdBy: req.user._id
    })

    return res.render('home', { id: shortID})
    //return res.status(200).json({id: shortID})
}
async function handleRedirectURL(req, res){
    const { shortId } = req.params
    const entry = await urlModel.findOneAndUpdate({shortId}, {$push: {visitHistory: {timeStamp:Date.now()}}} )
    return res.redirect(entry.redirectURL)
    //res.status(200).json({msg: ``})
}

async function handleGetAnalytics(req, res){
    const { shortId } = req.params

    const entry = await urlModel.findOne({shortId} )
    if (!entry) {
        return res.status(404).json({ msg: `No entry with id: ${shortId}` })
    }
    

    res.status(200).json(
        {totalClicks: `The number of visits on ${entry.redirectURL} are ${entry.visitHistory.length}`,
        analytics: entry.visitHistory}
    )
}



module.exports = { handleGenerateShortURL, handleRedirectURL,handleGetAnalytics }