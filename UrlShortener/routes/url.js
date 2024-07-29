const express = require('express')
const router = express.Router()
const {handleGenerateShortURL,handleRedirectURL, handleGetAnalytics} = require('../controllers/url')


router.route('/').post(handleGenerateShortURL)
router.route('/:shortId').get(handleRedirectURL)
router.route('/analytics/:shortId').get(handleGetAnalytics)


module.exports = router